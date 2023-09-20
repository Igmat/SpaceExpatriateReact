import { CardType } from "./card-types";
import { makeAutoObservable, autorun } from "mobx";
import { writeToLS, readFromLS } from "../utils";

export class DeckModel<T extends { id: number }> {
  constructor(
    public readonly type: CardType,
    cardsDefinitions: { [key: number]: T }
  ) {
    this.cardsDefinitions = cardsDefinitions;
    this.activeCards = readFromLS("activeCards") || Object.keys(this.cardsDefinitions);
    this.mixCards();
    makeAutoObservable(this);
    autorun(()=>{
      writeToLS("activeCards", this.activeCards)
      writeToLS(this.type, this.openedCard)
      writeToLS("droppedCards", this.droppedCards)
    })
  }

  private activeCards: number[] = readFromLS("activeCards") || []
  private cardsDefinitions: { [key: number]: T };
  private droppedCards: number[] = readFromLS("droppedCards") || [];

  openedCard?: T = readFromLS(this.type) || undefined;//если не присваетать  undefined скатывается в null и выдает ошибку результат выполнения openCard 

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
    return this.cardsDefinitions[idOfCard];
 
  };

  dropCards = (...cards: number[]) => {
    this.droppedCards.push(...cards);
  //  console.log('Im in  dropCards')
  };

  get restCount () {
    return this.droppedCards.length;
  };

  a = 1;
  b = 2;
  
  get sum() {
    return this.a + this.b
  }
}

//https://mobx.js.org/README.html
