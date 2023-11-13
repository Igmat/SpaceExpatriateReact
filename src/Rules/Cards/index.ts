import {
    action,
    computed,
    makeObservable,
    observable,
  } from "mobx";
  import { HandModel } from "../HandModel";
  import { TableModel } from "../TableModel";
 import { ICardPlace } from "./ICardPlace";
  import { DeckModel } from "../DeckModel";
  
  export class CardsMethods {
    public place?: "hand" | "deck" | "table" = undefined;
    constructor() {
      makeObservable(this, {
        place: observable,
        isInHand: computed,
        isInDeck: computed,
        isOnTable: computed,
        move: action.bound,
      });
    }
    public get isInHand() {
      return this.place === "hand";
    }
  
    public get isInDeck() {
      return this.place === "deck";
    }
    public get isOnTable() {
      return this.place === "table";
    }
  
    public move(from: ICardPlace, to: ICardPlace) {
      to.placeCard(from.takeCard(this as any));
      //console.log(to)
      if (to instanceof TableModel) {
        this.place = "table";
      }
      if (to instanceof DeckModel) {
        this.place = "deck";
      }
      if (to instanceof HandModel) {
        this.place = "hand";
      }
  
     // console.log(this.place);
    }

  }