import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
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
    this.resources.createEngineeringMaps(this.table.engineering);
    this.resources.calculateStartEnergy();
  };

  tryNext = () => {
    this.deliveryOption = undefined;
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => { //зачем связывать первые шаги?
    this.table.tempDroppedCards.push(this.hand.dropCard(card)) &&
      this.resources.energy.energy++ &&
      this.resources.engineeringMaps.FinishCounter++;
   //   && this.increaseMiddleEnergyByDropCards() //? не уверена что работает правильно (Маша)
    this.increaseMiddleEnergyByDropCards(); //после && не работает 
    console.log("energy: " + this.resources.energy.energy);
    console.log(this.resources.engineeringMaps.FinishCounter)
  };

  activateCardOnTable = (card: CardDefinition) => {
    !this.resources.engineeringMaps.Middle.hasOwnProperty(card.id) &&
      this.calculateResourcesCombination(); //&& this.tryNext()
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
    this.resources.calculateStartEnergy();
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

    console.log(this.calculatedResources);
  };
}
