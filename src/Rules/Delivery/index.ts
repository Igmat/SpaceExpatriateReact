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

  gainResources(card: EngineeringCard) {
    if (card.exitPoint === undefined) return;
    let combinations: Array<ResourcePrimitive[]> = [[]];
    card.exitPoint.forEach((el) => {
      let list: ResourcePrimitive[] = typeof el === "string" ? [el] : el;
      let newCombinations:Array<ResourcePrimitive[]> = [];
      combinations.forEach((combination) => {
        list.forEach((resource) => {
          newCombinations.push([...combination, resource]);
        });
      });
      newCombinations=newCombinations.map((combination)=>combination.sort());
      combinations = newCombinations;
      console.log(combinations);
    });

    // card.exitPoint.forEach((el) => {
    //   if (typeof el === "string") {
    //     this.resources.gainResource(el);
    //   }
    //   if (Array.isArray(el)) {
    //     this.round.step = "resources";
    //     // вот тут надо посчитать все возможные комбинации ресурсов и вывести их в окно.
    //     // Моя модалка примет варианты
    //   }
    // });

    // if (card.exitPoint?.length === 1) {
    //   this.resources.gainResource(card.exitPoint[0]);
    // }
    //   this.round.step = "resources";
    //   this.round.params = card.exitPoint;
  }
}
