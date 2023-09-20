import { makeAutoObservable, autorun } from "mobx";
import {
  EngineeringCard,
  Resource,
  ResourcePrimitive,
  TerraformingCard,
} from "./card-types";
import { TableModel } from "./TableModel";
import { writeToLS, readFromLS } from "../utils";//new
import { RoundManager } from "./RoundManager";
import { generateCombinations, toArrayArray } from "../Utils";

type playerResources = {
  [key in ResourcePrimitive | any]: number;
  //[key: any]: number;
};
export class ResourcesModel {
  constructor(
    private readonly table: TableModel,
    private readonly round: RoundManager
  ) {
    makeAutoObservable(this);
  }

  constructor(private readonly table: TableModel) {
    makeAutoObservable(this);
    autorun(() => {
      writeToLS("garbageResources", this.garbageResources);
      writeToLS("playerResources", this.playerResources);
      writeToLS("tempGarbageResources", this.tempGarbageResources);
      writeToLS("charterResource", this.charterResource);
      writeToLS("engineeringMaps", this.engineeringMaps);
      writeToLS("points", this.points);
      writeToLS("energy", this.energy);
    });
  }
  public playerResources: playerResources = readFromLS("playerResources") || {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };

  public charterResource?: ResourcePrimitive = readFromLS("charterResource");

  public garbageResources: playerResources = readFromLS("garbageResources") || {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
  };

  public tempGarbageResources: playerResources = readFromLS("tempGarbageResources") || {};

  saveGarbage = () => {
    for (let key in this.garbageResources) {
      this.tempGarbageResources[key] = this.garbageResources[key];
    }
  };
  /**********Points************************************************************************** */
  public points = readFromLS("points") || {
    round: 0,
    total: 0,
  };

  public engineeringMaps = readFromLS("engineeringMaps") || {
    Start: {} as { [key: number]: number },
    Middle: {} as { [key: number]: number },
    FinishCounter: 0,
  };

  getResources = () => {
    this.dropResources();
    this.table.delivery.forEach((card) =>
      card.resources.forEach((res) => this.playerResources[res]++)
    );
    for (let key in this.playerResources) {
      if (this.garbageResources.hasOwnProperty(key)) {
        this.playerResources[key] -= this.garbageResources[key];
      }

      if (this.playerResources[key] < 0) this.playerResources[key] = 0;
    }
    this.charterResource && this.playerResources[this.charterResource]++;
    // this.savePlayerResources()//запасной вариант востановления ресурсов при ресете
  };

  addResource = (resource: ResourcePrimitive) => {
    this.charterResource = resource;
  };

  dropToGarbage = () => {
    for (let key in this.garbageResources) {
      this.garbageResources[key] = this.playerResources[key];
    }
    this.saveGarbage(); //сохранение состояния гаража в момент перехода на следующий раунд
  };

  dropResources = () => {
    for (let key in this.playerResources) {
      this.playerResources[key] = 0;
    }
  };
  /*
  savePlayerResources = () => {//запасной вариант востановления ресурсов при ресете
    for (let key in this.playerResources) {
      this.tempPlayerResources[key] = this.playerResources[key];
    }
  };
resetPlayerResources = () => {//запасной вариант востановления ресурсов при ресете
  for (let key in this.tempPlayerResources) {
    this.playerResources[key] = this.tempPlayerResources[key];
  }
}*/
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

  tryConsumeResources(resources: Resource[], onConsume: () => void) {
    
    if (resources === undefined) return onConsume();
    const combinations = generateCombinations(toArrayArray(resources));
    const validCombinations = combinations.filter(
      (
        combination //проверка все ли кобинации ресурсов с карт валидны и покажу только валидные
      ) => this.canConsumeResources(combination)
    );
    if (validCombinations.length === 0) return;
    if (validCombinations.length === 1) {
      this.consumeResources(validCombinations[0]);
      return onConsume();
    }
    this.round.startResourceStep(validCombinations, (selected) => {
      this.consumeResources(selected);
      onConsume();
    });
  }

  gainResources(card: EngineeringCard) {
    //получение ресурсов
    if (card.exitPoint === undefined) return;
    const combinations = generateCombinations(toArrayArray(card.exitPoint));
    if (combinations.length === 1) {
      combinations[0].forEach((resource) => {
        this.gainResource(resource);
      });
      return;
    }
    this.round.startResourceStep(combinations, (selected) => {
      selected.forEach((resource) => {
        this.gainResource(resource);
      });
    });
  }

  gainResource = (resource: ResourcePrimitive) => {
    this.playerResources[resource]++;
  };

  removeResourcesFromGarbage = (resource: ResourcePrimitive) => {
    this.garbageResources[resource] = 0;
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

  resetRoundState = () => {
    this.resetRoundPoints(); // был ресет всех очков, а надо только раунда
    this.resetEnergy(); // обнуляем счетчик энергии
    this.createEngineeringMaps(this.table.engineering); 
    this.getResources();
  };
  
  confirmRoundResourceActions = () => {
    this.dropToGarbage(); // перемещение ресурсов от игрока в garbage
    this.dropResources(); //очистка ресурсов игрока
    this.resetEnergy(); // обнуляем счетчик енергии
    this.calculateTotalPoints(); //подсчет общих очков
    this.charterResource = undefined; //обнуление чартера
  };

  createEngineeringMaps = (cards: EngineeringCard[]) => {
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

    console.log(this.engineeringMaps.Start);
    console.log(this.engineeringMaps);
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


  public energy = readFromLS("energy") || 0;


  get energy() {
    return this._energy;
  }
  resetEnergy = () => {
    this._energy = 0;
  };

}
