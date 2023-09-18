import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
  Resource,
  TerraformingCard,
  EngineeringCard,
  isResourcePrimitive,
  ResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";
import { generateCombinations, toArrayArray } from "../../Utils";

export type DeliveryOption = "charter" | "garbage";

export class ActionManager implements IActionManager {
  constructor(
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly decks: DeckManager
  ) {
    makeAutoObservable(this);
  }

  public calculatedResources: Resource[] = [];
  deliveryOption?: DeliveryOption;
  usedTerraformingCards: TerraformingCard[] = []; //использованные карты Terraforming
  tempDroppedCards: CardDefinition[] = [];

  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card);
  };

  perform = (card: CardDefinition) => {
    this.round.setStep("options");
    this.resources.createEngineeringMaps(this.table.engineering);
  };

  tryNext = () => {
    this.deliveryOption = undefined;
    this.decks.dropCards(...this.hand.tempDroppedCards); //сброс временных карт из руки в общий сброс
    this.dropTempCards(); //очистка временных карт из руки
    this.resources.dropToGarbage(); // перемещение ресурсов от игрока в garbage
    this.resources.dropResources(); //очистка ресурсов игрока
    this.resources.resetEnergy(); // обнуляем счетсик енергии
    this.usedTerraformingCards = []; //очистка использованных карт Terraforming
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    this.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.energy++; //увеличение энергии после сброса карты
    this.resources.engineeringMaps.FinishCounter++; //увеличение FinishCounter после сброса карты
    this.increaseMiddleEnergyByDropCards(); //увеличение всех Middle value после сброса карты после && не работает
    console.log(this.resources.engineeringMaps.FinishCounter);
  };

  activateCardOnTable = (card: CardDefinition) => {
    if (card.type === "engineering") {
      this.activateEngineeringCard(card);
    }
    if (card.type === "terraforming") {
      if (!this.usedTerraformingCards.includes(card)) {
        this.useTerraformingCard(card);
        this.tryConsumeResources(card.resources, () => {
          this.resources.calculateRoundPoints(card);
        });
      }
    }
    return false;
  };

  select = (option: string) => {
    if (option === "charter" || option === "garbage") {
      this.deliveryOption = option;
      return;
    }
    if (isResourcePrimitive(option)) {
      if (this.deliveryOption === undefined) return;
      if (this.deliveryOption === "charter") {
        this.resources.addResource(option);
      }
      if (this.deliveryOption === "garbage") {
        this.resources.removeResourcesFromGarbage(option);
      }
      this.resources.getResources();
      this.round.setStep("performing");
    }
  };

  addCardsToTempDrop = (ind: number) => {
    const card = this.hand.cardsInHand[ind];
    this.tempDroppedCards.push(card); //пушим карту во временный сброс
    this.hand.dropCard(ind); //вырезаем карту из руки
    // console.log(this.tempDroppedCards)
    return card;
  };

  reset = () => {
    this.resetTempDroppedCards();
    this.resources.resetRoundPoints(); // был ресет всех очков, а надо только раунда
    this.resources.resetEnergy(); // обнуляем счетсик енергии
    //this.resources.resetPlayerResources();//запасной вариант востановления ресурсов при ресете
    this.resources.getResources();
    console.log("!!");
  };

  increaseMiddleEnergyByDropCards = () => {
    for (const key in this.resources.engineeringMaps.Middle) {
      if (this.resources.engineeringMaps.Middle.hasOwnProperty(key)) {
        this.resources.engineeringMaps.Middle[key]++;
        console.log(
          "MiddleMap: " + key + " " + this.resources.engineeringMaps.Middle[key]
        );
      }
    }
  };

  // определить все комбинации ресурсов на столе
  // calculateResourcesCombination = () => {
  //   this.table.terraforming.forEach((card) => {
  //     this.calculatedResources.push(...card.resources);
  //   });
  // };
  // этот метод кажется не нужным, ни где не используется и не вызывается

  dropTempCards = () => {
    this.tempDroppedCards = []; //очищаем временный сброс
  };
  resetTempDroppedCards = () => {
    this.tempDroppedCards.forEach((card) => this.hand.cardsInHand.push(card));
    this.tempDroppedCards = [];
  };

  activateEngineeringCard(card: EngineeringCard) {
    if (card.connection === "start") {
      this.processStartConnection(card);
    }
    if (card.connection === "continue") {
      this.processContinueConnection(card);
    }
    if (card.connection === "end") {
      this.processEndConnection(card);
    }
  }

  processStartConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.Start[card.id] === 0) return;
    this.tryConsumeResources(card.entryPoint ? [card.entryPoint] : [], () => {
      this.resources.engineeringMaps.Start[card.id] = 0;
      this.resources.increaseEnergy();
      this.resources.calculateRoundPoints(card);
      for (const key in this.resources.engineeringMaps.Middle) {
        if (this.resources.engineeringMaps.Middle.hasOwnProperty(key)) {
          this.resources.engineeringMaps.Middle[key]++;
        }
      }
      this.resources.changeFinishCounter(1);
    });
  }

  processContinueConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.Middle[card.id] <= 0) return;
    this.tryConsumeResources(card.entryPoint ? [card.entryPoint] : [], () => {
      this.resources.calculateRoundPoints(card);
      this.resources.engineeringMaps.Middle[card.id]--;
      this.gainResources(card);
    });
  }

  processEndConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.FinishCounter <= 0) return;
    this.tryConsumeResources(card.entryPoint ? [card.entryPoint] : [], () => {
      this.resources.calculateRoundPoints(card);
      this.resources.changeFinishCounter(-1);
      this.gainResources(card);
    });
  }

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
      this.resources.consumeResources(validCombinations[0]);
      return onConsume();
    }
    this.round.setStep("resources");
    this.round.params = validCombinations;
    this.round.onSelect = (selected) => {
      this.resources.consumeResources(selected);
      onConsume();
    };
  }

  canConsumeResources(resources: ResourcePrimitive[]) {
    this.resources.consumeResources(resources);
    const hasNegativeValues = Object.values(
      this.resources.playerResources
    ).some((value) => value < 0);

    resources.forEach((resource) => {
      this.resources.gainResource(resource);
    });
    
    return !hasNegativeValues;
  }

  gainResources(card: EngineeringCard) {
    //получение ресурсов
    if (card.exitPoint === undefined) return;
    const combinations = generateCombinations(toArrayArray(card.exitPoint));
    if (combinations.length === 1) {
      combinations[0].forEach((resource) => {
        this.resources.gainResource(resource);
      });
      return;
    }
    this.round.setStep("resources");
    this.round.params = combinations;
    this.round.onSelect = (selected) => {
      selected.forEach((resource) => {
        this.resources.gainResource(resource);
      });
    };
  }
}
