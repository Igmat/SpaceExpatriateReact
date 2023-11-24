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
  ) {
    makeAutoObservable(this);
    // makeAutoSavable(this, gameId, "terraformingManager", [
    //   "cardsToDrop",
    //   "missionType",
    // ]);
  }

  private _isEnded: boolean = false;
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
      this.gameState.cardsToDrop.cards.length === 3 &&
      this.gameState.cardsToDrop.cards.filter((card) => card.type === this.missionType)
        .length === 3
    );
  }

  get isOneCardOfEachType() {
    return (
      this.gameState.cardsToDrop.cards.length === 4 &&
      CardTypes.map(
        (el) => this.gameState.cardsToDrop.cards
          .filter((card) => card.type === el).length === 1)
        .filter(Boolean).length === 4
    );
  }

  get tryBuildColony() {
    //даёт разрешение на сброс карт
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      return true
    } else
      return false
  };

  get dropCards() {
    //сбрасываем карты в колоду постоянного сброса
    this.gameState.cardsToDrop.cards.forEach((card) => card.move(this.decks[card.type].droppedCards));
    return true
  };

  activateDeck = async (type: CardType) => { };

  activateCard = async (card: GeneralCard) => { };

  activateCardOnTable = async (card: GeneralCard) => {
    if (this.gameState.cardsToDrop.cards.length >= 4) return false;
    !this.tryBuildColony && card.move(this.gameState.cardsToDrop) //если условие для сброса карт больше не выполняется - карты сбрасывать нельзя
    return true;
  };

  activateColonyCard = async (selectedCardIndex: number) => {
    if (this.isThreeCardsOfSameType || this.isOneCardOfEachType) {
      //если выполняется условие для постройки колонии
      return this.buildColony(selectedCardIndex); //строим колонию
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
    if (this.tryBuildColony && this.dropCards) {
      this.colonyDeck.countPoints();
      this._isEnded = true;
    }
  };

  confirm = async () => {
    if (!this.tryBuildColony && this.gameState.cardsToDrop.isEmpty === false) return

    if (this.gameState.cardsToDrop.isEmpty) {
      this.colonyDeck.countPoints();
      this._isEnded = true;
    }

  };

  reset = async () => {
    this.gameState.cardsToDrop.cards.forEach((card) => card.move(this.table[card.type]));
  };

  isDisabled(card: GeneralCard): boolean {
    if (this.round.phase === "terraforming" && card.isOnTable) {
      if (this.gameState.cardsToDrop.isEmpty) {
        return false
      }
      if (card.isOnTable && this.gameState.cardsToDrop.cards.length >= 1) {
        const cards = this.gameState.cardsToDrop.cards;

        if (cards.length >= 1 && cards[0].type !== this.missionType && cards.some(el => el.type === card.type)) {
          return true;
        }

        if (cards.length > 1 && cards.every(el => el.type === this.missionType) && card.type !== this.missionType) {
          return true;
        }

        if (cards.length >= 2 && cards.some(el => el.type !== this.missionType) && cards.some(el => el.type === card.type)) {
          return true;
        }
      }
    }

    if (card.isOnTable) {
      return this.isDisabledTable(card);
    }
    if (card.isInHand || card.isInDeck || card.isOpened) {
      return true;
    }
    return false;

  }

  isDisabledDeck = (type: CardType): boolean => true;

  isDisabledTable = (card: GeneralCard): boolean => false; //тут надо доделать логику полсле того, как будет понятно, каки работает метод постройки колонии

  isDisabledCard = (card: GeneralCard): boolean => true;

}
