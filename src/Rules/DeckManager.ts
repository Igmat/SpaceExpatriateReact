import { makeAutoObservable } from "mobx";
import { deliveryCards } from "./CardDefinitions/delivery";
import { engineeringCards } from "./CardDefinitions/engineering";
import { militaryCards } from "./CardDefinitions/military";
import { terraformingCards } from "./CardDefinitions/terraforming";
import { DeckModel } from "./DeckModel";
import { CardDefinition } from "./card-types";
import { GameState } from ".";

export class DeckManager {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string
  ) {
    makeAutoObservable(this);
  }

  delivery = new DeckModel("delivery", deliveryCards, this.gameId, this.gameState);
  engineering = new DeckModel("engineering", engineeringCards, this.gameId, this.gameState);
  terraforming = new DeckModel("terraforming", terraformingCards, this.gameId, this.gameState);
  military = new DeckModel("military", militaryCards, this.gameId, this.gameState);

  dropCards = (...cards: CardDefinition[]) => {
    cards.forEach((card) => this[card.type].dropCards(card.id));
  };

  isInDeck = (card: CardDefinition) => {
    return this[card.type].findCard(card);
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
