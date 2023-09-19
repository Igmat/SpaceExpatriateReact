import { makeAutoObservable, autorun } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
  Resource,
  ResourcePrimitive,
  TerraformingCard,
  isResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";
import localStorage from "mobx-localstorage";

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
    autorun(() => {
      localStorage.setItem("calculatedResources", this.calculatedResources);
      localStorage.setItem("deliveryOption", this.deliveryOption);
      localStorage.setItem("sedTerraformingCards", this.usedTerraformingCards);
      localStorage.setItem("tempDroppedCards", this.tempDroppedCards);
    });
  }

  public calculatedResources: Resource[] =
    localStorage.getItem("calculatedResources") || [];
  deliveryOption?: DeliveryOption =
    localStorage.getItem("deliveryOption") || undefined;
  usedTerraformingCards: TerraformingCard[] =
    localStorage.getItem("localStorage") || []; //использованные карты Terraforming
  tempDroppedCards: CardDefinition[] = localStorage.getItem("tempDroppedCards") || [];

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
    this.resources.energy = 0; // обнуляем счетсик енергии
    console.log("tryNext");
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

  addCardsToTempDrop = (ind: number) => {
    const card = this.hand.cardsInHand[ind];
    this.tempDroppedCards.push(card); //пушим карту во временный сброс
    this.hand.dropCard(ind); //вырезаем карту из руки
    // console.log(this.tempDroppedCards)
    return card;
  };

  reset = () => {
    this.resetTempDroppedCards();
    this.resources.resetPoints();
    this.resources.energy = 0; // обнуляем счетсик енергии
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

    console.log(this.calculatedResources);
  };

  dropTempCards = () => {
    this.tempDroppedCards = []; //очищаем временный сброс
  };
  resetTempDroppedCards = () => {
    this.tempDroppedCards.forEach((card) => this.hand.cardsInHand.push(card));
    this.tempDroppedCards = [];
  };
}
