import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { CardDefinition, CardType } from "./card-types";
import { makeAutoObservable } from "mobx";

export class DeckModel<T extends { id: number }> {
  constructor(
    public readonly type: CardType,
    private readonly cardsDefinitions: { [key: number]: T },
    gameId: string
  ) {
    makeAutoObservable(this);
    if (!gameId) return;
    const isLoaded = makeAutoSavable(this, gameId, `deckmodel_${type}`, [
      "_activeCards" as any,
      "_droppedCards" as any,
      "openedCard",
    ]);
    if (!isLoaded) {
      this.initialize();
    }
  }

  private _activeCards: number[] = [];
  private _droppedCards: number[] = [];
  openedCard?: T;

  initialize = () => {
    this._activeCards = Object.keys(this.cardsDefinitions);
    this.mixCards();
    this.openCard();
  };

  openCard = () => {
    this.openedCard !== undefined && this.dropCards(this.openedCard.id);
    this.openedCard = this.takeCard();
  };

  takeOpenedCard() {
    const result = this.openedCard;
    this.openedCard = undefined;
    return result;
  }

  takeOpenedCardAndOpenNew = () => {
    const result = this.takeOpenedCard();
    this.openCard();

    return result;
  };

  private mixCards() {
    const result: number[] = [];
    const restCards = [...this._activeCards];

    while (restCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * restCards.length);
      result.push(restCards[randomIndex]);
      restCards.splice(randomIndex, 1);
    }
    this._activeCards = result;
  }

  takeCard = (): T => {
    const idOfCard = this._activeCards.pop()!;
    if (this._activeCards.length === 0) {
      this._activeCards = this._droppedCards;
      this._droppedCards = [];
      this.mixCards();
    }
    return this.cardsDefinitions[idOfCard];
  };

  dropCards = (...cards: number[]) => {
    this._droppedCards.push(...cards);
  };

  findCard = (card: CardDefinition) => {
    return card.id === this.openedCard?.id;
  };

  get restCount() {
    return this._droppedCards.length;
  }
}
