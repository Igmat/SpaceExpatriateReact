import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { CardDefinition, CardType } from "./card-types";
import { TableModel } from "./TableModel";
import { RoundManager } from "./RoundManager";
import { HandModel } from "./HandModel";

export class ActionManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel
  ) {
    makeAutoObservable(this);
  }
  remaining = {
    activateDeck: 0,
    activateCard: 0,
  };

  perform = (card?: CardDefinition) => {
    if (!card) return;
    if (this.round.phase !== "active") return;

    this.table.takeCard(this.decks[card.type].takeOpenedCard()!);

    if (this.round.current < 5) {
      this.round.next();
      return;
    }
    this.round.phase = card.type;
    switch (card.type) {
      case "delivery":
        break;
      case "engineering":
        this.remaining.activateDeck = 1;
        this.remaining.activateCard = 1;
        break;
      case "military":
        break;
      case "terraforming":
        break;
    }
  };
  
  tryNext = () => {
    if (
      this.remaining.activateDeck === 0 &&
      this.remaining.activateCard === 0
    ) {
      this.round.next();
    }
  };

  activateDeck = (type: CardType) => {
    if (this.remaining.activateDeck === 0) return;
    this.remaining.activateDeck--;
    if (this.round.phase === "engineering") {
      this.table.takeCard(this.decks[type].takeCard());
    }
    if (this.round.phase === "military") {
      this.hand.takeCard(this.decks[type].takeCard());
    }
    this.tryNext();
  };

  activateCard = (card: number) => {
    if (this.remaining.activateCard === 0) return;
    this.remaining.activateCard--;
    if (this.round.phase === "engineering") {
      this.table.takeCard(this.hand.dropCard(card));
    }
    this.tryNext();
  };
}
