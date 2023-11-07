import { makeAutoObservable } from "mobx";
import {
  BasicResource,
  EngineeringCard,
  Resource,
  ResourcePrimitive,
  TerraformingCard,
} from "./card-types";
import { TableModel } from "./TableModel";
import { generateCombinations, toArrayArray } from "../Utils";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { ColonyCardWithPoints } from "./Colony/ColonyDeckModel";
import { ModalManager } from "./ModalManager";
import { GameState } from ".";

export type PlayerResources = {
  [key in ResourcePrimitive]: number;
};

export type GarbageResources = Omit<PlayerResources, "dark matter">;

export class ResourcesModel {
  constructor(
    private readonly gameState: GameState,
    private readonly table: TableModel,
    private readonly modal: ModalManager,
    gameId: string
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "resources", [
      "garbageResources",
      "points",
    ], this.gameState.saveCondition);
  }

  public playerResources: PlayerResources = {
    "biotic materials": 0,
    fuel: 0,
    machinery: 0,
    minerals: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };

  public charterResource?: ResourcePrimitive;

  public garbageResources: GarbageResources = {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
  };

  /**********Points************************************************************************** */
  public points = {
    round: 0,
    total: 0,
  };

  public engineeringMaps = {
    Start: {} as { [key: number]: number },
    Middle: {} as { [key: number]: number },
    FinishCounter: 0,
  };

  getResources = async () => {
    this.dropResources();
    this.table.delivery.forEach((card) =>
      card.resources.forEach((res) => this.playerResources[res]++)
    );
    Object.keys(this.garbageResources)
      .forEach(key => {
        this.playerResources[key] -= this.garbageResources[key]
        if (this.playerResources[key] < 0) this.playerResources[key] = 0;
      })

    this.charterResource && this.playerResources[this.charterResource]++;
  };

  addResource = (resource: ResourcePrimitive) => {
    this.charterResource = resource;
  };

  dropToGarbage = () => {
    Object.keys(this.garbageResources)
      .forEach(key => this.garbageResources[key] = this.playerResources[key])
  };

  dropResources = () => {
    Object.keys(this.playerResources)
      .forEach(key => this.playerResources[key] = 0)
  };

  consumeResources = (resources: ResourcePrimitive[]) => {
    //потребление ресурсов
    resources.forEach((resource) => {
      this.playerResources[resource]--;
    });
  };

  canConsumeResources(resources: ResourcePrimitive[]) {
    // перевіряємо чи є в гравця кошти для виконання карти (списали /не зайшли в мінус?/повернули)
    this.consumeResources(resources);
    const hasNegativeValues = Object.values(this.playerResources).some(
      (value) => value < 0
    );
    resources.forEach((resource) => {
      this.gainResource(resource);
    });
    return !hasNegativeValues;
  }

  handleCardProcessing = (card: EngineeringCard) => {
    this.calculateRoundPoints(card);
    this.useCardConnection(card);
    this.gainResources(card);
  };

  async tryConsumeResources(resources: Resource[]) {
    if (resources === undefined) return true;
    const variants = toArrayArray(resources);
    const darkMatterVariants: ResourcePrimitive[][] = variants.map(
      (variant) => [
        //добавление варианта с темной материей
        ...variant,
        "dark matter",
      ]
    );

    const combinations = generateCombinations(darkMatterVariants);
    const validCombinations = combinations.filter(
      (
        combination //проверка все ли кобинации ресурсов с карт валидны и покажу только валидные
      ) => this.canConsumeResources(combination)
    );
    if (validCombinations.length === 0) return;
    if (validCombinations.length === 1) {
      this.consumeResources(validCombinations[0]);
      return true;
    }
    const selected = await this.modal.show("resources", validCombinations);
    this.consumeResources(selected);
    return true;
  }

  async gainResources(card: EngineeringCard) {
    //получение ресурсов
    if (card.exitPoint === undefined) return;
    const combinations = generateCombinations(toArrayArray(card.exitPoint));
    if (combinations.length === 1) {
      combinations[0].forEach((resource) => {
        this.gainResource(resource);
      });
      return;
    }
    const selected = await this.modal.show("resources", combinations);
      selected.forEach((resource) => {
      this.gainResource(resource);
    })
  }

  gainResource = (resource: ResourcePrimitive) => {
    this.playerResources[resource]++;
  };

  removeResourcesFromGarbage = (
    resource: BasicResource
  ) => {
    this.garbageResources[resource] = 0;
  };

  extractColonyPoints = (selectedCard: ColonyCardWithPoints) => {
    const colonyPoints = selectedCard.points || 0;
    this.points.total += colonyPoints;
    delete selectedCard.points;
  };
  
  addPoints = (points: number) => {
    this.points.total += points;
  };

  calculateTotalPoints = () => {
    this.points.total += this.points.round;
    this.resetRoundPoints();
  };

  calculateRoundPoints = (card: EngineeringCard | TerraformingCard) => {
    this.points.round += card.points || 0;
  };

  resetRoundPoints = () => {
    this.points.round = 0;
  };

  resetRoundState = async () => {
    this.resetRoundPoints(); // был ресет всех очков, а надо только раунда
    this.resetEnergy(); // обнуляем счетчик энергии
    this.createEngineeringMaps(this.table.engineering);
    await this.getResources();
  };

  confirmRoundResourceActions = () => {
    this.dropToGarbage(); // перемещение ресурсов от игрока в garbage
    this.dropResources(); //очистка ресурсов игрока
    this.resetEnergy(); // обнуляем счетчик енергии
    this.calculateTotalPoints(); //подсчет общих очков
    this.charterResource = undefined; //обнуление чартера
  };

  createEngineeringMaps = (cards: readonly EngineeringCard[]) => {
    if (cards.length === 0) return;
    const startArr: EngineeringCard[] = [];
    const continueArr: EngineeringCard[] = [];

    cards.forEach((card) => {
      if (card.connection === "start") startArr.push(card);
      if (card.connection === "continue") continueArr.push(card);
    });
    this.engineeringMaps.Start = startArr.reduce(
      (acc, card) => (acc[card.id] = 1) && acc,
      {} as { [key: number]: number }
    );
    this.engineeringMaps.Middle = continueArr.reduce(
      (acc, card) => (acc[card.id] = 0) || acc,
      {} as { [key: number]: number }
    );
    this.engineeringMaps.FinishCounter = 0; // забывали очищать счетчик, если была скинута карта с руки с предыдущего раунда
  };

  useCardConnection = (card: EngineeringCard) => {
    if (card.connection === "start") {
      this.engineeringMaps.Start[card.id] = 0;
      this.increaseEnergyAndMapValues();
    }
    if (card.connection === "continue") {
      this.engineeringMaps.Middle[card.id]--;
    }
    if (card.connection === "end") {
      this.changeFinishCounter(-1);
    }
  };

  increaseEnergyAndMapValues = () => {
    this._energy++;
    this.increaseAllMiddleValues();
    this.changeFinishCounter(1);
  };

  private increaseAllMiddleValues() {
    for (const key in this.engineeringMaps.Middle) {
      if (this.engineeringMaps.Middle.hasOwnProperty(key)) {
        this.engineeringMaps.Middle[key]++;
      }
    }
  }

  private changeFinishCounter(increment: number) {
    this.engineeringMaps.FinishCounter += increment;
  }

  /****Energy*************************************************************************** */

  private _energy = 0;

  get energy() {
    return this._energy;
  }
  resetEnergy = () => {
    this._energy = 0;
  };
}
