import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
  EngineeringCard,
  Resource,
  ResourcePrimitive,
  isResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";

export type DeliveryOption = "charter" | "garbage";

export class ActionManager implements IActionManager {
  constructor(
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel
  ) {
    makeAutoObservable(this);
  }

  public calculatedResources: Resource[] = [];
  deliveryOption?: DeliveryOption;

  perform = (card: CardDefinition) => {
    this.round.step = "options";
    //this.remaining.activateCard = this.hand.cardsInHand.length;
    this.resources.createEngineeringMap(this.table.engineering);
  };

  tryNext = () => {
    this.deliveryOption = undefined;
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    this.table.tempDroppedCards.push(this.hand.dropCard(card)) &&
      this.resources.energy.energy++ &&
      this.resources.engineeringMaps.FinishCounter++ &&
      this.increaseMiddleEnergyByDropCards(); //? не уверена что работает правильно
    console.log("energy: " + this.resources.energy.energy);
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

  reset = () => {
    this.table.resetTempDroppedCards();
    this.resources.getResources();
    this.resources.resetPoints();
    this.resources.currentStartEnergy();
  };

  increaseMiddleEnergyByDropCards = () => {
    for (const key in this.resources.engineeringMaps.MiddleMap) {
      if (this.resources.engineeringMaps.MiddleMap.hasOwnProperty(key)) {
        this.resources.engineeringMaps.MiddleMap[key]++;
        console.log(
          "MiddleMap: " +
            key +
            " " +
            this.resources.engineeringMaps.MiddleMap[key]
        );
      }
    }
  };

  // определить все комбинации ресурсов на столе
  calculateResourcesCombination = () => {
    this.table.terraforming.forEach((card) => {
      this.calculatedResources.push(...card.resources);
    });

    console.log(this.calculatedResources);
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
    if (this.resources.engineeringMaps.StartMap[card.id] === 0) return;
    if (!this.consumeResources(card)) return;
    this.resources.engineeringMaps.StartMap[card.id] = 0;
    this.resources.energy.energy++;
    this.resources.points.round += card.points || 0;
    for (const key in this.resources.engineeringMaps.MiddleMap) {
      if (this.resources.engineeringMaps.MiddleMap.hasOwnProperty(key)) {
        this.resources.engineeringMaps.MiddleMap[key]++;
      }
    }
    this.resources.engineeringMaps.FinishCounter++;
  }

  processContinueConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.MiddleMap[card.id] <= 0) return;
    if (!this.consumeResources(card)) return;
    this.resources.points.round += card.points || 0;
    this.resources.engineeringMaps.MiddleMap[card.id]--;
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
