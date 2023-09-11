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

  perform = (card: CardDefinition) => {
    this.round.step = "options";
    //this.remaining.activateCard = this.hand.cardsInHand.length;
    this.resources.createEngineeringMaps(this.table.engineering);
    this.resources.calculateStartEnergy();
  };

  tryNext = () => {
    this.deliveryOption = undefined;
    this.decks.dropCards(...this.table.tempDroppedCards);//сброс временных карт со стола в общий сброс
    this.table.dropTempCards();//очистка временных крат на столе
    this.decks.dropCards(...this.hand.tempDroppedCards);//сброс временных карт из руки в общий сброс
    this.hand.dropTempCards();//очистка временных карт из руки
    this.resources.dropToGarbage();// перемещение ресурсов от игрока в garbage
    this.resources.dropResources();//очистка ресурсов игрока
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    //зачем связывать первые шаги?

    //this.table.tempDroppedCards.push(this.hand.dropCard(card)) &&
    this.hand.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.energy.energy++ && //увеличение энергии после сброса карты
      this.resources.engineeringMaps.FinishCounter++; //увеличение FinishCounter после сброса карты
    //   && this.increaseMiddleEnergyByDropCards() //? не уверена что работает правильно (Маша)
    this.increaseMiddleEnergyByDropCards(); //увеличение всех Middle value после сброса карты после && не работает
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
    this.hand.resetTempDroppedCards()
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
