import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType } from "./card-types";

type Phase = "active" | CardType | "passive";

export class RoundManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly hand: HandModel
  ) {
    makeAutoObservable(this);
    this.hand.takeCard(this.decks.delivery.takeCard());
    this.hand.takeCard(this.decks.engineering.takeCard());
    this.hand.takeCard(this.decks.military.takeCard());
    this.hand.takeCard(this.decks.terraforming.takeCard());
  }

  current = 1;
  phase: Phase = "active";
  next = () => {
    this.current++;
    this.phase = "active";
    this.decks.delivery.openCard();
    this.decks.engineering.openCard();
    this.decks.military.openCard();
    this.decks.terraforming.openCard();
  };
  
}
