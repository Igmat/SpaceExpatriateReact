import { makeAutoObservable } from "mobx";
import { deliveryCards } from "./CardDefinitions/delivery";
import { engineeringCards } from "./CardDefinitions/engineering";
import { militaryCards } from "./CardDefinitions/military";
import { terraformingCards } from "./CardDefinitions/terraforming";
import { DeckModel } from "./DeckModel";
import { CardDefinition, ColonyCard } from "./card-types";

export class DeckManager {
  constructor(private readonly gameId: string) {
    makeAutoObservable(this);
  }

  delivery = new DeckModel("delivery", deliveryCards, this.gameId);
  engineering = new DeckModel("engineering", engineeringCards, this.gameId);
  terraforming = new DeckModel("terraforming", terraformingCards, this.gameId);
  military = new DeckModel("military", militaryCards, this.gameId);

  dropCards = (...cards: Exclude<CardDefinition, ColonyCard>[]) => {
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
