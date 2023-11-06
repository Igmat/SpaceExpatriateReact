import { makeAutoObservable, makeObservable } from "mobx";
import { HandModel } from "../HandModel";
import { DeckManager } from "../DeckManager";
import { TableModel } from "../TableModel";
import { GeneralCard } from "../card-types";

/*
export class CardModel {
  constructor(public id: number, public type: CardType) {
    makeAutoObservable(this);
  }
}

*/

export class CardsMethods {
  private place?: "hand" | "deck" | "table";
  constructor() {}

  public get isInHand(): boolean {
    return this.place === "hand";
  }

  public isInDeck() {
    return this.place === "deck";
  }
  public isOnTable() {
    return this.place === "table";
  }
/*
  public move(from: ICardPlace, to: ICardPlace) {
    //instanceof
    to.takeCard(from.takeOpenedCard);
  }*/
}
