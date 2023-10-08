import { makeAutoObservable } from "mobx";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

export class ColonyDeckModel<T extends { id: number }> {
  constructor(
    private readonly cardsDefinitions: { [key: number]: T },
    gameId: string
  ) {
    makeAutoObservable(this);
    const isLoaded = makeAutoSavable(this, gameId, "colonyDeck", [
      "_activeCards" as any,
      "openedCards"]
      )
      if (!isLoaded) {
        this.initialize();
      }
  }

  private _activeCards: number[] = [];
  openedCards: T[] = [];

  initialize = () => {
    this._activeCards = Object.keys(this.cardsDefinitions);
    this.mixCards();
    this.openedCards = this._activeCards
      .splice(0, 3)
      .map((id) => this.cardsDefinitions[id]);
  };

  openCard() {
    if (this.openedCards.length < 3) {
      const remainingCards = 3 - this.openedCards.length;
      const newCards = this._activeCards
        .splice(0, remainingCards)
        .map((id) => this.cardsDefinitions[id]);
      this.openedCards.push(...newCards);
    }
  }

  takeOpenedCard(ind: number) {
    const card = this.openedCards[ind];
    this.openedCards.splice(ind, 1);
    return card;
  }

  takeCard = (): T => {
    const idOfCard = this._activeCards.pop()!;
    if (this._activeCards.length === 0) {
      //игра заканчивается, подсчитываются очки - метод нужен позже
    }
    return this.cardsDefinitions[idOfCard];
  };

  mixCards() {
    const result: number[] = [];
    const restCards = [...this._activeCards];

    while (restCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * restCards.length);
      result.push(restCards[randomIndex]);
      restCards.splice(randomIndex, 1);
    }
    this._activeCards = result;
  }
}
