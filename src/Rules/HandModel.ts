import { makeAutoObservable, autorun } from "mobx";
import { CardDefinition } from "../Rules/card-types";
import localStorage from "mobx-localstorage";

export class HandModel {
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      localStorage.setItem("cardsInHand", this.cardsInHand);
      localStorage.setItem("tempDroppedCards", this.tempDroppedCards);
    });
  }
  public cardsInHand: CardDefinition[] = localStorage.getItem("cardsInHand") || [];
  public tempDroppedCards: CardDefinition[] = localStorage.getItem("tempDroppedCards") || [];


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
