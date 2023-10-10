import { makeAutoObservable } from "mobx";
import { ColonyDeckModel } from "./ColonyDeckModel";
import { colonyCards } from "./colony-cards";
import { ColonyCard } from "../card-types";

export class ColonyManager {
  constructor(private readonly gameId: string) {
    makeAutoObservable(this);
    this.initialize();
  }

  colonies: ColonyCard[] = [];
  colonyDeck = new ColonyDeckModel(colonyCards, this.gameId);

  effects = {
    selectDeliveryStation: () => { },
    adjustGarbage: () => { },
  };

  initialize = () => { };

  /*beforePerform = (card: any) => {
    const aplicable = this.findAplicableColonyCards(card.type, "before");
    aplicable.forEach((colony: ColonyCard) => {
      colony.activate();
      colony.effects.forEach((effect) => {
        this.effects[effect]();
      });
    });
  };

  findAplicableColonyCards = () => {

  };
  */

  getColonyPoints = () => { };

}
