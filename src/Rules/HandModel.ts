import { autorun, makeAutoObservable } from "mobx";
import { CardDefinition } from "../Rules/card-types";
import { writeToLS, readFromLS } from "../utils";

export class HandModel {

  constructor() {
    makeAutoObservable(this);
    autorun(() => {
     writeToLS("cardsInHand", this.cardsInHand);
     writeToLS("tempDroppedCards", this.tempDroppedCards);
    });
  }
  public cardsInHand: CardDefinition[] = readFromLS("cardsInHand") || [];
  public tempDroppedCards: CardDefinition[] = readFromLS("tempDroppedCards") || [];


 dropCard = (ind: number) => {
    const card = this.cardsInHand[ind];
    this.cardsInHand.splice(ind, 1); //вырезаем карту из руки
    return card;
  };

  takeCard(card?: CardDefinition) {
    //  console.log(`cards in the hand ${this.cardsInHand.length + 1}`);
    card && this.cardsInHand.push(card);
  }
}
