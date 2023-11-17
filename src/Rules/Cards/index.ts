import { action, computed, makeObservable, observable} from "mobx";
import { TablePlace } from "../Places/TablePlace";
import { CardType } from "../card-types";
import { BasicPlace } from "../Places";
import { HandPlace } from "../Places/HandPlace";
import { ActiveCardsPlace } from "../Places/ActiveCardsPlace";
import { OpenedCardsPlace } from "../Places/OpenedCardPlace";

export abstract class BasicCard {
  private _place?: BasicPlace<BasicCard>;
  public abstract readonly type: CardType;

  constructor(public id: number) {
    makeObservable(this, {
      ["_place" as any]: observable,
      isInHand: computed,
      isInDeck: computed,
      isOnTable: computed,
      isOpened: computed,
      move: action.bound,
    });
  }
  public get isInHand() {
    return this._place instanceof HandPlace;
  }

  public get isInDeck() {
    return this._place instanceof ActiveCardsPlace; 
  }
  
  public get isOpened() {
    return this._place instanceof OpenedCardsPlace;
  }

  public get isOnTable() {
    return this._place instanceof TablePlace;
  }

  public move(to?: BasicPlace<BasicCard>) {
    if (this._place !== undefined) {
      this._place.takeCard(this.id, this.type);
    }
    to?.placeCard(this.id, this.type);
    this._place = to;
  }

  // public move(to?: BasicPlace<BasicCard>) {
  //   this.place?.takeCard(this.id, this.type);
  //   to?.placeCard(this.id, this.type);
  //   this.place = to;
  // }
}
