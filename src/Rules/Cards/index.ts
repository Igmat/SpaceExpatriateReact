import { action, computed, makeObservable, observable } from "mobx";
import { TablePlace } from "../Places/TablePlace";
import { CardType } from "../card-types";
import { BasicPlace } from "../Places";
import { HandPlace } from "../Places/HandPlace";
import { ActiveCardsPlace } from "../Places/ActiveCardsPlace";

export abstract class BasicCard {
  private place?: BasicPlace<BasicCard>;
  public abstract readonly type: CardType;

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
    return this.place instanceof ActiveCardsPlace; //создать
  }

  public get isOnTable() {
    return this.place instanceof TablePlace;
  }

  public move(to: BasicPlace<BasicCard>) {
    if (this.place !== undefined) {
      this.place.takeCard(this.id, this.type);
    }
    to.placeCard(this.id, this.type);
    this.place = to;
  }
}
