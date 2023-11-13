import { GameState } from ".";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { CardType, GeneralCard } from "./card-types";
import { makeAutoObservable } from "mobx";

export class DeckModel<T extends { id: number }> {
  constructor(
    public readonly type: CardType,
    public readonly cardsDefinitions: { [key: number]: T },
    gameId: string,
    gameState: GameState
  ) {
    makeAutoObservable(this);

    const isLoaded = makeAutoSavable(
      this,
      gameId,
      `deckmodel_${type}`,
      ["_activeCards" as any, "_droppedCards" as any, "_openedCard"],
      gameState.saveCondition
    );
    if (!isLoaded) {
      this.initialize();
    }
  }

  private _activeCards: number[] = [];
  private _droppedCards: number[] = [];
  private _openedCard?: number;

  initialize = () => {
    this._activeCards = Object.keys(this.cardsDefinitions).map((key) =>
      Number(key)
    );
    this.mixCards();
    this.openCard();
  };

  get openedCard(): T | undefined {
    if (this._openedCard !== undefined)
      return this.cardsDefinitions[this._openedCard];
    return undefined;
  }

  openCard = () => {
    this._openedCard !== undefined && this.dropCards(this._openedCard);
    this._openedCard = this.takeCard().id;
  };

  takeOpenedCard(): T | undefined {
    if (this._openedCard === undefined) return undefined;
    const result = this._openedCard;
    this._openedCard = undefined;
    return this.cardsDefinitions[result];
  }


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

  findCard = (card: GeneralCard) => {
    return card.id === this._openedCard;
  };

  get restCount() {
    return this._droppedCards.length;
  }
}
