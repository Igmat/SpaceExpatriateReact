import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { CardDefinition, CardType } from "./card-types";
import { TableModel } from "./TableModel";
import { RoundManager } from "./RoundManager";
import { HandModel } from "./HandModel";
import { deliveryCards } from "./CardDefinitions/delivery";

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

  cardsToDrop: CardDefinition[] = [];

  missionType?: CardType;

  perform = (card?: CardDefinition) => {
    if (!card) return;
    if (this.round.phase !== "active") return;

    this.table.takeCard(this.decks[card.type].takeOpenedCard()!);

    if (this.round.current < 5) {
      this.round.next();
      return;
    }

    this.round.phase = card.type;

    console.log("Phase: " + this.round.phase);

    switch (card.type) {
      case "delivery":
        this.round.step = "options";
        break;
      case "engineering":
        this.remaining.activateDeck = 1;
        this.remaining.activateCard = 1;
        this.round.step = "performing";
        break;
      case "military":
        this.round.step = "options";
        break;
      case "terraforming":
        this.round.step = "options";
        break;
    }
  };

  tryNext = () => {
    if (
      this.remaining.activateDeck === 0 &&
      this.remaining.activateCard === 0
    ) {
      this.missionType = undefined;
      console.log("This Round: " + this.round.current + " is over");
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
    console.log("activateCard" + this.remaining.activateCard)
    if (this.round.phase === "engineering") {
      this.table.takeCard(this.hand.dropCard(card));
    }
    this.tryNext();
  };

  activateCardsOnTable = (cards: CardDefinition) => {
    this.round.phase === "terraforming" && this.round.step === "performing"
      && this.cardsToDrop.push(cards);
    console.log("cardsToDrop: " + this.cardsToDrop.length);
  }

  endAction = () => {
    console.log("This Round: " + this.round.current + " is over");
    this.tryNext();
  };

  setMissionType = (card: CardType) => {
    this.round.step = "performing";
    this.missionType = card;
  }


  tryBuildColony = () => {
    this.cardsToDrop.length === 3
      && this.cardsToDrop.filter((card) => card.type === this.missionType).length === 3
      && this.dropCards();
    this.cardsToDrop.length === 4
      && (["delivery", "engineering", "terraforming", "military"] as const)
        .map(el =>
          this.cardsToDrop.filter((card) => card.type === el).length === 1)
        .filter(Boolean).length === 4
      && this.dropCards()
  }

  dropCards = () => {
    this.round.phase === "terraforming" && this.round.step === "performing"
      && this.table.dropCards(...this.cardsToDrop);

    this.cardsToDrop = [];
    console.log("You have dropped cards and got 1 Colony");
    this.tryNext();
  }

  reset = () => {
    this.cardsToDrop = [];
    console.log("cardsToDrop: " + this.cardsToDrop.length);
  }
}
