import {
    action,
    computed,
    makeObservable,
    observable,
  } from "mobx";
  import { HandModel } from "../HandModel";
  import { TableModel } from "../TableModel";
 import { ICardPlace } from "../Places/ICardPlace";
  import { DeckModel } from "../DeckModel";
  
  export class CardsMethods {
    public placeFrom?: "hand" | "deck" | "table" = undefined;
    public placeNow?: "hand" | "deck" | "table" = undefined;
    
    constructor() {
      makeObservable(this, {
        placeFrom: observable,
        placeNow: observable,
        isInHand: computed,
        isInDeck: computed,
        isOnTable: computed,
        move: action.bound,
      });
    }
    public get isInHand() {
      return this.placeNow === "hand";
    }
  
    public get isInDeck() {
      return this.placeNow === "deck";
    }

    public get isOnTable() {
      return this.placeNow === "table";
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