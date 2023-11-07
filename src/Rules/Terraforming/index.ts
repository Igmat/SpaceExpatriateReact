import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType, CardTypes } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
// import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { ResourcesModel } from "../ResourcesModel";
import { ColonyDeckModel } from "../Colony/ColonyDeckModel";
import { ColonyManager } from "../Colony/ColonyManager";
import { ModalManager } from "../ModalManager";
import { HandModel } from "../HandModel";
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
    private readonly resources: ResourcesModel,
    private readonly modal: ModalManager,
    private readonly hand: HandModel
  ) {
    makeAutoObservable(this);
    // makeAutoSavable(this, gameId, "terraformingManager", [
    //   "cardsToDrop",
    //   "missionType",
    // ]);
  }
  private _isEnded: boolean = false;

  perform = async (card: CardDefinition) => {
    this._isEnded = false;
    this.missionType = await this.modal.show("terraforming", CardTypes);

    if (this.missionType) {
      this.round.startPerformingStep();
    }
    this.table.resetSelected();
  };

  confirm = async () => {
    await this.reset(); // чистим масив сбрасываемых карт и если выполняется условие для постройки колонии, но не строим, то возвращаем карты на стол
    this.colonyDeck.countPoints();
    this._isEnded = true;
  };

  get isEnded() {
    return this._isEnded;
  }

  activateDeck = async (type: CardType) => {};

  activateCard = async (card: number) => {};

  activateColonyCard = async (card: number) => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      //если выполняется условие для постройки колонии
      return this.buildColony(card); //строим колонию
    }
  };

  activateCardOnTable = async (card: CardDefinition) => {
    const cardIndex = this.cardsToDrop.indexOf(card);
    this.table.toggleSelected(card);
    if (cardIndex !== -1) {
      this.cardsToDrop.splice(cardIndex, 1);
      return true;
    }
    this.cardsToDrop.push(card);
    this.tryBuildColony();
    return true;
  };

  reset = async () => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      this.cardsToDrop.forEach((card) => this.table.takeCard(card));
    }
    this.cardsToDrop = [];
    this.table.resetSelected();
  };

  dropCards = () => {
    this.table.dropCards(...this.cardsToDrop);
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
      //  console.log("No more colony cards available.");
      return;
    }

    this.resources.extractColonyPoints(selectedCard);

    this.colony.takeColonyCard(selectedCard);
    this.decks.dropCards(...this.cardsToDrop); //сбрасываем карты в колоду постоянного сброса
    this.cardsToDrop = []; //чистим масив сбрасываемых карт
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
      CardTypes.map(
        (el) => this.cardsToDrop.filter((card) => card.type === el).length === 1
      ).filter(Boolean).length === 4
    );
  }

  isDisabled(card: CardDefinition): boolean {
    if (this.table.isOnTable(card)) {
      return this.isDisabledTable(card);
    }
    if (this.hand.isInHand(card) || this.decks.isInDeck(card)) {
      return true;
    }
    return false;
  }
  isDisabledDeck = (type: CardType): boolean => true;

  isDisabledTable = (card: CardDefinition): boolean => false; //тут надо доделать логику полсле того, как будет понятно, каки работает метод постройки колонии
}
