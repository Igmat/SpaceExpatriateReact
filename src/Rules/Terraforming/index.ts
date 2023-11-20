import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardType, CardTypes, GeneralCard } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
// import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { ResourcesModel } from "../ResourcesModel";
import { ColonyDeckModel } from "../Colony/ColonyDeckModel";
import { ColonyManager } from "../Colony/ColonyManager";
import { ModalManager } from "../ModalManager";
import { HandModel } from "../HandModel";
import { CardsToDropPlace } from "../Places/CardsToDropPlace";
import { GameState } from "..";
export class ActionManager implements IActionManager {
  constructor(
    private readonly gameState: GameState,
    private readonly round: RoundManager,
    private readonly table: TableModel,
    private readonly decks: DeckManager,
    private readonly gameId: string,
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
  private _cardsToDrop = new CardsToDropPlace(this.gameState.cards, this.gameId);
  missionType?: CardType;

  perform = async (card: GeneralCard) => {
    this._isEnded = false;
    this.missionType = await this.modal.show("terraforming", CardTypes);

    if (this.missionType) {
      this.round.startPerformingStep();
    }
  };

  get isEnded() {
    return this._isEnded;
  }

  get isThreeCardsOfSameType() {
    return (
      this._cardsToDrop.cards.length === 3 &&
      this._cardsToDrop.cards.filter((card) => card.type === this.missionType)
        .length === 3
    );
  }

  get isOneCardOfEachType() {
    return (
      this._cardsToDrop.cards.length === 4 &&
      CardTypes.map(
        (el) => this._cardsToDrop.cards.filter((card) => card.type === el).length === 1
      ).filter(Boolean).length === 4
    );
  }

  activateDeck = async (type: CardType) => {};

  activateCard = async (card: GeneralCard) => {};

  activateCardOnTable = async (card: GeneralCard) => { 
    card.move(this._cardsToDrop) //карта уходит во временный сброс
    this.tryBuildColony();
    return true;
  };

  activateColonyCard = async (selectedCardIndex: number) => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      //если выполняется условие для постройки колонии
      return this.buildColony(selectedCardIndex); //строим колонию
    }
  };

  tryBuildColony = () => {
    //проверяем, выполняется ли условие для постройки колонии, отвечает за перенос карт в временны сброс. Можем вернуть ресетом
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      this.dropCards();
    }
  };

  buildColony = async (selectedCardIndex: number) => {
    const selectedCard = this.colonyDeck.takeOpenedCard(selectedCardIndex);

    if (!selectedCard) {
      //  console.log("No more colony cards available.");
      return;
    }
    this.resources.extractColonyPoints(selectedCard);
    this.colony.takeColonyCard(selectedCard);
    this.confirm()
  };

  confirm = async () => { 
    this.colonyDeck.countPoints();
    this._isEnded = true;
  };

  reset = async () => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      this._cardsToDrop.cards.forEach((card) => card.move(this.table[card.type]));
    }
  };

  dropCards = () => {
     //сбрасываем карты в колоду постоянного сброса
    this._cardsToDrop.cards.forEach((card) => card.move(this.decks[card.type].droppedCards));
  };

  isDisabled(card: GeneralCard): boolean {
    if (card.isOnTable) {
      return this.isDisabledTable(card);
    }
    if (card.isInHand || card.isInDeck) {
      return true;
    }
    return false;
  }

  isDisabledDeck = (type: CardType): boolean => true;

  isDisabledTable = (card: GeneralCard): boolean => false; //тут надо доделать логику полсле того, как будет понятно, каки работает метод постройки колонии
}
