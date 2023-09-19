import { makeAutoObservable, autorun } from "mobx";
import { deliveryCards } from "./CardDefinitions/delivery";
import { engineeringCards } from "./CardDefinitions/engineering";
import { militaryCards } from "./CardDefinitions/military";
import { terraformingCards } from "./CardDefinitions/terraforming";
import { DeckModel } from "./DeckModel";
import { CardDefinition } from "./card-types";
import localStorage from "mobx-localstorage";

export class DeckManager {
  constructor() {
    makeAutoObservable(this);
  }

  delivery = new DeckModel("delivery", deliveryCards);
  engineering = new DeckModel("engineering", engineeringCards);
  terraforming =  new DeckModel("terraforming", terraformingCards);
  military =  new DeckModel("military", militaryCards);


  openCards = () => {
    this.delivery.openCard();
    this.engineering.openCard();
    this.military.openCard();
    this.terraforming.openCard();
  }
  dropCards = (...cards: CardDefinition[]) => {
    cards.forEach((card) => this[card.type].dropCards(card.id));
  };

  get dropLength() {
    return (
      this.delivery.restCount +
      this.engineering.restCount +
      this.terraforming.restCount +
      this.military.restCount
    );
  }

}
