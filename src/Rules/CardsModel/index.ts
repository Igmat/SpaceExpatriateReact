import { makeAutoObservable } from "mobx";
import { GeneralCardDefinition } from "../CardDefinitions/createCards";

export class CardsModel {
  constructor(id: number, type: GeneralCardDefinition) {
    makeAutoObservable(this);
  }

  test() {
    console.log("!!!!!!!!!!!!");
  }
}
