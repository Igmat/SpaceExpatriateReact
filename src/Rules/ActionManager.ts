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
      //console.log("round" + this.round.current);
      return;
    }
    this.round.phase = card.type;
    // console.log(this.round.phase);
    switch (card.type) {
      case "delivery": //my
        this.round.step = "options";
        break;
      case "engineering":
        this.remaining.activateDeck = 1;
        this.remaining.activateCard = 1;
        this.round.step = "performing";
        console.log("engineering");
        break;
      case "military":
        console.log("military");
        this.round.step = "options";
        break;
      case "terraforming":
        console.log("terraforming");
        this.round.step = "options";
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
    if (this.round.phase === "delivery") {
      //  this.table.shooseCard(card)
      //  this.console(this.round.phase)
    }
    this.tryNext();
  };

  activateCard = (card: number) => {
    if (this.remaining.activateCard === 0) return;
    this.remaining.activateCard--;
    if (this.round.phase === "engineering") {
      this.table.takeCard(this.hand.dropCard(card));
    }
    if (this.round.phase === "delivery") {
   
    }
    this.tryNext();
  };

  activateCardsOnTable = (card: CardDefinition) => {

    if (this.round.phase === "delivery") {
      this.table.shooseCard(card.type);
      this.round.nextPerformingStep()
    }
  }

 
}
