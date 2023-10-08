import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType, isCardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { ColonyManager } from "../Colony/ColonyManager";

export class ActionManager implements IActionManager {
  cardsToDrop: CardDefinition[] = [];
  missionType?: CardType;

  constructor(
    private readonly round: RoundManager,
    private readonly table: TableModel,
    private readonly decks: DeckManager,
    gameId: string,
    private readonly colony: ColonyManager
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "terraformingManager", [
      "cardsToDrop",
      "missionType",
    ]);
  }

  perform = (card: CardDefinition) => {
    this.round.startOptionsStep();
  };

  tryNext = () => {
    this.reset() // чистим масив сбрасываемых карт и если выполняется условие для постройки колонии, но не строим, то возвращаем карты на стол
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    if (this.isThreeCardsOfSameType() || this.isOneCardOfEachType()) {
      //если выполняется условие для постройки колонии
      this.buildColony(card); //строим колонию
      
    }
  };

  activateCardOnTable = (card: CardDefinition) => {
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
    if (this.isThreeCardsOfSameType() || this.isOneCardOfEachType()) {
      this.cardsToDrop.forEach((card) => this.table.takeCard(card));
    }
    this.cardsToDrop = [];
    console.log("cardsToDrop: " + this.cardsToDrop.length);
  };

  dropCards = () => {
    this.table.dropCards(...this.cardsToDrop);
    console.log("You have dropped cards and got 1 Colony");
  };

  tryBuildColony = () => {
    //проверяем, выполняется ли условие для постройки колонии, отвечает за перенос карт в временны сброс. Можем вернуть ресетом
    if (this.isThreeCardsOfSameType() || this.isOneCardOfEachType()) {
      this.dropCards();
    }
  };

  buildColony = (selectedCardIndex: number) => {
    const selectedCard =
      this.colony.colonyDeck.takeOpenedCard(selectedCardIndex);

    if (selectedCard) {
      this.table.takeColonyCard(selectedCard);
      this.decks.dropCards(...this.cardsToDrop); //сбрасываем карты в колоду постоянного сброса
      this.cardsToDrop = []; //чистим масив сбрасываемых карт
    } else {
      console.log("No more colony cards available.");
    }
  };

  isThreeCardsOfSameType = () => {
    if (
      this.cardsToDrop.length === 3 &&
      this.cardsToDrop.filter((card) => card.type === this.missionType)
        .length === 3
    ) {
      return true;
    }
  };

  isOneCardOfEachType = () => {
    if (
      this.cardsToDrop.length === 4 &&
      (["delivery", "engineering", "terraforming", "military"] as const)
        .map(
          (el) =>
            this.cardsToDrop.filter((card) => card.type === el).length === 1
        )
        .filter(Boolean).length === 4
    ) {
      return true;
    }
  };
}
