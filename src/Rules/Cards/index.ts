import {
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";
import { ICardPlace } from "../Places/ICardPlace";
import { TablePlace } from "../Places/TablePlace";

export class BasicCard {
  private readonly place: ICardPlace<BasicCard>; 

  constructor(public id: number) {
    makeObservable(this, {
      isInHand: computed,
      isInDeck: computed,
      isOnTable: computed,
      move: action.bound,
    });
  }
  public get isInHand() {
    return this.place instanceof HandPlace; //создать
  }

  public get isInDeck() {
    return this.place instanceof DeckPlace; //создать
  }

  public get isOnTable() {
    return this.place instanceof TablePlace;
  }

  public move(to: ICardPlace<BasicCard>) {
    to.placeCard(this.place.takeCard(this.id));
    this.place = to;
  }
}