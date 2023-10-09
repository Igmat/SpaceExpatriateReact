import { makeAutoObservable } from "mobx";
import { ColonyDeckModel } from "./ColonyDeckModel";
import { colonyCards } from "./colony-cards";
import { ColonyCard } from "../card-types";

interface notTakenColonyCard {
  id: number;
  points: number;
}

export class ColonyManager {
  constructor(private readonly gameId: string) {
    makeAutoObservable(this);
    this.initialize();
  }
  
  colonies: ColonyCard[] = [];
  colonyDeck = new ColonyDeckModel(colonyCards, this.gameId);
  currentRound: number = 0;
  notTakenColonyCards: notTakenColonyCard[] = [];

  initialize = () => {};
  effects = {
    selectDeliveryStation: () => {},
    adjustGarbage: () => {},
  };
  
  beforePerform = (card: any) => {
    const aplicable = this.findAplicableColonyCards(card.type, "before");
    aplicable.forEach((colony) => {
      colony.activate();
      colony.effects.forEach((effect) => {
        this.effects[effect]();
      });
    });
  };

  // get points from colony cards if they are was not taken after round
  getColonyPoints = () => {};

  // reset colony cards when button "reset" is clicked
  reset = () => {};
}
