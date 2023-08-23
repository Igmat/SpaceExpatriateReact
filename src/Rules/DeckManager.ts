import { makeAutoObservable } from "mobx";
import { deliveryCards } from "./CardDefinitions/delivery";
import { engineeringCards } from "./CardDefinitions/engineering";
import { militaryCards } from "./CardDefinitions/military";
import { terraformingCards } from "./CardDefinitions/terraforming";
import { DeckModel } from "./DeckModel";
import { CardDefinition } from "./card-types";

export class DeckManager {
  constructor() {
    makeAutoObservable(this);
  }

  delivery = new DeckModel("delivery", deliveryCards);
  engineering = new DeckModel("engineering", engineeringCards);
  terraforming = new DeckModel("terraforming", terraformingCards);
  military = new DeckModel("military", militaryCards);

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
