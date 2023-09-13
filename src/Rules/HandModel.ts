import { makeAutoObservable } from "mobx";
import { CardDefinition } from "../Rules/card-types";

export class HandModel {
  public cardsInHand: CardDefinition[] = [];
  public tempDroppedCards: CardDefinition[] = []

  constructor() {
    makeAutoObservable(this);
  }

  addCardsToTempDrop = (ind: number) => {
    const card = this.cardsInHand[ind];
    this.tempDroppedCards.push(card); //пушим карту во временный сброс
    this.cardsInHand.splice(ind, 1); //вырезаем карту из руки
    // console.log(this.tempDroppedCards)
    return card;
  };
  dropTempCards = () => {
    this.tempDroppedCards = []; //очищаем временный сброс
  };
  resetTempDroppedCards = () => {
    this.tempDroppedCards.forEach((card) => this.cardsInHand.push(card));
    this.tempDroppedCards = []
  };

  takeCard(card?: CardDefinition) {
    //  console.log(`cards in the hand ${this.cardsInHand.length + 1}`);
    card && this.cardsInHand.push(card);
  }
}
