import { makeAutoObservable } from "mobx";
import { CardType } from "./card-types";

export class CardModel {
  constructor(public id: number, public type: CardType) {
    makeAutoObservable(this);
  }
}
