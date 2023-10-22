import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { HandModel } from "../HandModel";
import { DeckManager } from "../DeckManager";
import { ModalManager } from "../ModalManager";

export type Militaryoption = "political" | "exploration";

export class ActionManager implements IActionManager {
  constructor(
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly decks: DeckManager,
    private readonly modal: ModalManager,
  ) {
    makeAutoObservable(this);
  }
  militaryoption?: Militaryoption;

  private remaining = {
    activateDeck: 0,
  };
  perform = (card: CardDefinition) => {
    this.modal.show("military", ["exploration", "political"]);
  };

  tryNext = () => this.remaining.activateDeck === 0;

  activateDeck = (type: CardType) => {
    if (
      this.round.step === "performing" &&
      this.militaryoption === "exploration"
    )
      this.hand.takeCard(this.decks[type].takeCard());
    this.remaining.activateDeck = 0;
   return this.tryNext()
  };

  activateCard = (card: number) => {};
  activateColonyCard = (card: number) => {};
  activateCardOnTable = (card: CardDefinition) => {
    return false;
  };

  select = (option: string) => {
    if (option === "political" || option === "exploration") {
      this.militaryoption = option;
    }
    if (this.militaryoption === "political") {
     return this.tryNext() //заглушка
    }
    if (this.militaryoption === "exploration") {
      this.round.startPerformingStep();
      this.remaining.activateDeck++;
    }
    console.log("militaryoption: " + this.militaryoption);
  };

  reset = () => {};

  isDisabled(place: string, card: CardDefinition, ): boolean {
    if (this.round.phase === "military") {
      if (place === "table") return true;
      if (place === "hand") return true;
      if (place === "opened") return true;
    }
    return false;
  }

  isDisabledDeck = (type: CardType): boolean => {
    return false;
  };


}
