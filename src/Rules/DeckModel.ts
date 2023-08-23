import { CardType } from "./card-types";
import { makeAutoObservable } from "mobx";

export class DeckModel<T extends { id: number }> {
  constructor(
    public readonly type: CardType,
    cardsDefinitions: { [key: number]: T }
  ) {
    this.cardsDefinitions = cardsDefinitions;
    this.activeCards = Object.keys(this.cardsDefinitions);
    this.mixCards();
    makeAutoObservable(this);
  }

  private activeCards: number[];
  private cardsDefinitions: { [key: number]: T };
  private droppedCards: number[] = [];

  openedCard?: T;

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
    console.log("takeOpenedCardandOpenNew");
    const result = this.takeOpenedCard();
    this.openCard();
 
    return result;
  };

  private mixCards() {
    const result: number[] = [];
    const restCards = [...this.activeCards];

    while (restCards.length > 0) {
      const randomIndex = Math.floor(Math.random() * restCards.length);
      result.push(restCards[randomIndex]);
      restCards.splice(randomIndex, 1);
    }
    this.activeCards = result;
  }

  takeCard = (): T => {
    const idOfCard = this.activeCards.pop()!;
    if (this.activeCards.length === 0) {
      this.activeCards = this.droppedCards;
      this.droppedCards = [];
      this.mixCards();
    }
    console.log('Im in takeCard')
    return this.cardsDefinitions[idOfCard];
 
  };

  dropCards = (...cards: number[]) => {
    this.droppedCards.push(...cards);
    console.log('Im in  dropCards')
  };

  get restCount () {
    return this.droppedCards.length;
  };
}

//https://mobx.js.org/README.html
