import { makeAutoObservable } from "mobx";
import { CardDefinition } from "../Rules/card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";

export class HandModel {
  public cardsInHand: CardDefinition[] = [];
  public tempDroppedCards: CardDefinition[] = []

  constructor(gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "hand", [
      "cardsInHand",
      "tempDroppedCards",
    ]);
  }
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
