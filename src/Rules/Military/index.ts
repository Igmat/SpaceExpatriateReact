import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { HandModel } from "../HandModel";
import { DeckManager } from "../DeckManager";
import { CardSource } from "../ActionManager";

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
  private _isEnded: boolean = false;

  perform = (card: CardDefinition) => {
    this.round.startOptionsStep();
  };
  confirm = () => {
   return true
  };

  get isEnded() {
    return this.remaining.activateDeck === 0;
  }

  resetIsEnded() {
    this._isEnded = false;
  }

  activateDeck = (type: CardType) => {
    if (
      this.round.step === "performing" &&
      this.militaryoption === "exploration"
    )
      this.hand.takeCard(this.decks[type].takeCard());
    this.remaining.activateDeck = 0;
    this.confirm();
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
      return true; //заглушка
    }
    if (this.militaryoption === "exploration") {
      this.round.startPerformingStep();
      this.remaining.activateDeck++;
    }
    //console.log("militaryoption: " + this.militaryoption);
  };

  reset = () => {};

  isDisabled = (place: CardSource, card: CardDefinition): boolean => true;

  isDisabledDeck = (type: CardType): boolean => false;
}
