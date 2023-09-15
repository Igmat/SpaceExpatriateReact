import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
  Resource,
  ResourcePrimitive,
  TerraformingCard,
  EngineeringCard,
  isResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";

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
 tempDroppedCards: CardDefinition[] = []

  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card);
  };

  perform = (card: CardDefinition) => {
    this.round.step = "options";
    this.resources.createEngineeringMaps(this.table.engineering);
  };

  tryNext = () => {
    this.deliveryOption = undefined;
    this.decks.dropCards(...this.hand.tempDroppedCards); //сброс временных карт из руки в общий сброс
    this.dropTempCards(); //очистка временных карт из руки
    this.resources.dropToGarbage(); // перемещение ресурсов от игрока в garbage
    this.resources.dropResources(); //очистка ресурсов игрока
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    this.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.energy.energy++; //увеличение энергии после сброса карты
    this.resources.engineeringMaps.FinishCounter++; //увеличение FinishCounter после сброса карты
    this.increaseMiddleEnergyByDropCards(); //увеличение всех Middle value после сброса карты после && не работает
    console.log(this.resources.engineeringMaps.FinishCounter)
  };

  activateCardOnTable = (card: CardDefinition) => {
    if (card.type === "engineering") {
      this.activateEngineeringCard(card);
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
      this.round.step = "performing";
    }
  };

  addCardsToTempDrop = (ind: number) => {
    const card = this.hand.cardsInHand[ind];
    this.tempDroppedCards.push(card); //пушим карту во временный сброс
    this.hand.dropCard(ind) //вырезаем карту из руки
    // console.log(this.tempDroppedCards)
    return card;
  };

  reset = () => {
    this.resetTempDroppedCards();
    this.resources.resetPoints();
    this.resources.resetEnergy();
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
  calculateResourcesCombination = () => {
    this.table.terraforming.forEach((card) => {
      this.calculatedResources.push(...card.resources);
    });
  };

  dropTempCards = () => {
    this.tempDroppedCards = []; //очищаем временный сброс
  };
  resetTempDroppedCards = () => {
    this.tempDroppedCards.forEach((card) => this.hand.cardsInHand.push(card));
    this.tempDroppedCards = []
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
    if (!this.consumeResources(card)) return;
    this.resources.engineeringMaps.Start[card.id] = 0;
    this.resources.energy.energy++;
    this.resources.points.round += card.points || 0;
    for (const key in this.resources.engineeringMaps.Middle) {
      if (this.resources.engineeringMaps.Middle.hasOwnProperty(key)) {
        this.resources.engineeringMaps.Middle[key]++;
      }
    }
    this.resources.engineeringMaps.FinishCounter++;
  }

  processContinueConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.Middle[card.id] <= 0) return;
    if (!this.consumeResources(card)) return;
    this.resources.points.round += card.points || 0;
    this.resources.engineeringMaps.Middle[card.id]--;
    this.gainResources(card);
  }

  processEndConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.FinishCounter <= 0) return;
    if (!this.consumeResources(card)) return;
    this.resources.points.round += card.points || 0;
    this.resources.engineeringMaps.FinishCounter--;
    this.gainResources(card);
    console.log(card.entryPoint + " " + card.exitPoint);
  }

  consumeResources(card: EngineeringCard) {
    if (card.entryPoint === undefined) return true;
    if (typeof card.entryPoint === "string") {
      if (this.resources.playerResources[card.entryPoint] === 0) return false;
      this.resources.playerResources[card.entryPoint]--;
    }
    if (Array.isArray(card.entryPoint)) {
      //доделать логику
    }
    return true;
  }

  areCombinationsEqual(
    combination1: ResourcePrimitive[],
    combination2: ResourcePrimitive[]
  ) {
    if (combination1.length !== combination2.length) {
      return false;
    }
    const sortedCombination1 = combination1.slice().sort();
    const sortedCombination2 = combination2.slice().sort();
    for (let i = 0; i < sortedCombination1.length; i++) {
      if (sortedCombination1[i] !== sortedCombination2[i]) {
        return false;
      }
    }
    return true;
  }

  removeDuplicateCombinations(combinations: Array<ResourcePrimitive[]>) {
    const uniqueCombinations = [];
    for (const combination of combinations) {
      let isDuplicate = false;
      for (const uniqueCombination of uniqueCombinations) {
        if (this.areCombinationsEqual(combination, uniqueCombination)) {
          isDuplicate = true;
          break;
        }
      }
      if (!isDuplicate) {
        uniqueCombinations.push(combination);
      }
    }
    return uniqueCombinations;
  }

  gainResources(card: EngineeringCard) {
    if (card.exitPoint === undefined) return;
    let combinations: Array<ResourcePrimitive[]> = [[]];
    card.exitPoint.forEach((el) => {
      let list: ResourcePrimitive[] = typeof el === "string" ? [el] : el;
      let newCombinations: Array<ResourcePrimitive[]> = [];
      combinations.forEach((combination) => {
        list.forEach((resource) => {
          newCombinations.push([...combination, resource]);
        });
      });
      combinations = this.removeDuplicateCombinations(newCombinations);
    });
    console.log(combinations);
    if (combinations.length === 1) {
      combinations[0].forEach((resource) => {
        this.resources.gainResource(resource);
      });
      return;
    }

    this.round.step = "resources";
    this.round.params = combinations;
  }
}
