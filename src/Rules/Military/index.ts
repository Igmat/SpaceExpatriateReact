import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { HandModel } from "../HandModel";
import { DeckManager } from "../DeckManager";

export type Militaryoption = "political" | "exploration";

export class ActionManager implements IActionManager {
  constructor(
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly decks: DeckManager
  ) {
    makeAutoObservable(this);
  }
  militaryoption?: Militaryoption;

  private remaining = {
    activateDeck: 0,
  };
  perform = (card: CardDefinition) => {
    this.round.startOptionsStep();
  };

  tryNext = () => true;

  activateDeck = (type: CardType) => {
    if (
      this.round.step === "performing" &&
      this.militaryoption === "exploration"
    )
      this.hand.takeCard(this.decks[type].takeCard());
    this.remaining.activateDeck = 0;

    this.tryNext() && this.round.next();
  };

  activateCard = (card: number) => {};
  activateCardOnTable = (card: CardDefinition) => {
    return false;
  };

  select = (option: string) => {
    if (option === "political" || option === "exploration") {
      this.militaryoption = option;
    }
    if (this.militaryoption === "political") {
      this.tryNext() && this.round.next();
    }
    if (this.militaryoption === "exploration") {
      this.round.startPerformingStep();
      this.remaining.activateDeck++;
    }
    console.log("militaryoption: " + this.militaryoption);
  };

  reset = () => {};
}
