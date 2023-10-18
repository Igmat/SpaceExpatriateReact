import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType, isCardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { ResourcesModel } from "../ResourcesModel";
import { ColonyDeckModel } from "../Colony/ColonyDeckModel";
import { ColonyManager } from "../Colony/ColonyManager";

export class ActionManager implements IActionManager {
  cardsToDrop: CardDefinition[] = [];
  missionType?: CardType;

  constructor(
    private readonly round: RoundManager,
    private readonly table: TableModel,
    private readonly decks: DeckManager,
    gameId: string,
    private readonly colony: ColonyManager,
    private readonly colonyDeck: ColonyDeckModel,
    private readonly resources: ResourcesModel
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "terraformingManager", [
      "cardsToDrop",
      "missionType",
    ]);
  }

  perform = (card: CardDefinition) => {
    this.round.startOptionsStep();
    this.table.resetSelectedFlags();
  };

  tryNext = () => {
    this.reset(); // чистим масив сбрасываемых карт и если выполняется условие для постройки колонии, но не строим, то возвращаем карты на стол
    this.colonyDeck.countPoints();
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {};

  activateColonyCard = (card: number) => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      //если выполняется условие для постройки колонии
      return  this.buildColony(card);//строим колонию
    }
  
  };

  activateCardOnTable = (card: CardDefinition) => {
    const cardIndex = this.cardsToDrop.indexOf(card);
    this.table.toggleSelectedFlag(card);
    if (cardIndex !== -1) {
      this.cardsToDrop.splice(cardIndex, 1);
      return true;
    }
    this.cardsToDrop.push(card);
    this.tryBuildColony();
    return true;
  };

  select = (option: string) => {
    if (isCardType(option)) {
      this.round.startPerformingStep();
      this.missionType = option;
    }
  };

  reset = () => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      this.cardsToDrop.forEach((card) => this.table.takeCard(card));
    }
    this.cardsToDrop = [];
    this.table.resetSelectedFlags();
    console.log("cardsToDrop: " + this.cardsToDrop.length);
  };

  dropCards = () => {
    this.table.dropCards(...this.cardsToDrop);
    console.log("You have dropped cards and got 1 Colony");
  };

  tryBuildColony = () => {
    //проверяем, выполняется ли условие для постройки колонии, отвечает за перенос карт в временны сброс. Можем вернуть ресетом
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      this.dropCards();
    }
  };

  buildColony = (selectedCardIndex: number) => {
    const selectedCard = this.colonyDeck.takeOpenedCard(selectedCardIndex);

    if (!selectedCard) {
      console.log("No more colony cards available.");
      return;
    }

    this.resources.extractColonyPoints(selectedCard);

    this.colony.takeColonyCard(selectedCard);
    this.decks.dropCards(...this.cardsToDrop); //сбрасываем карты в колоду постоянного сброса
    this.cardsToDrop = []; //чистим масив сбрасываемых карт
    //this.tryNext() && this.round.next(); //переходим к следующему раунду
    return this.tryNext()
  };

  get isThreeCardsOfSameType() {
    return (
      this.cardsToDrop.length === 3 &&
      this.cardsToDrop.filter((card) => card.type === this.missionType)
        .length === 3
    );
  }

  get isOneCardOfEachType() {
    return (
      this.cardsToDrop.length === 4 &&
      (["delivery", "engineering", "terraforming", "military"] as const)
        .map(
          (el) =>
            this.cardsToDrop.filter((card) => card.type === el).length === 1
        )
        .filter(Boolean).length === 4
    );
  }

  isDisabled(place: string, card: CardDefinition): boolean {
    if (this.round.phase === "terraforming") {
      if (place === "table") return this.isDisabledTable(card);
      if (place === "hand") return true;
      // if (type === "deck") return this.isDisabledDeck(card.type);
      if (place === "opened") return true;
    }
    return false;
  }

  isDisabledTable = (card: CardDefinition): boolean => {
    //тут надо доделать логику полсле того, как будет понятно, каки работает метод постройки колонии
    return false;
  };

  isDisabledDeck = (type: CardType): boolean => {
    if (this.round.phase === "terraforming") return true;
    return false;
  };
}
