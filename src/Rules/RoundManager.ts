import { autorun, makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType, ResourcePrimitive } from "./card-types";
import { writeToLS, readFromLS } from "../utils";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "resources" | "done";

export class RoundManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly hand: HandModel
  ) {
    makeAutoObservable(this);
    this.takeCardsToHand();
    if (this.current === 1) this.decks.openCards();
    autorun(() => {
      writeToLS("current", this.current);
      writeToLS("phase", this.phase);
      writeToLS("step",this._step !== "resources" ? this._step : readFromLS("step", undefined));
      console.log(this._step);
    });
  }

  current = readFromLS("current", 1);

  phase: Phase = readFromLS("phase", "active");
  private _step?: Step = readFromLS("step", undefined); 
  private _params?: ResourcePrimitive[][]; 
  private _onSelect?: (selected: ResourcePrimitive[]) => void;

  startNewGame = () => {
    this.current = 1;
  };

  takeCardsToHand = () => {
    if (this.current === 1) {
      this.decks.dropCards(...this.hand.cardsInHand);
      this.hand.cardsInHand = [];
      this.hand.takeCard(this.decks.delivery.takeCard());
      this.hand.takeCard(this.decks.engineering.takeCard());
      this.hand.takeCard(this.decks.military.takeCard());
      this.hand.takeCard(this.decks.terraforming.takeCard());
    }
  };

  get step() {
    return this._step;
  }
  get params() {
    return this._params;
  }
  get onSelect() {
    return this._onSelect;
  }

  next = () => {
    this.current++;
    // console.log("Round: " + this.current + " is started");
    this.phase = "active";
    this._step = undefined;
    this.decks.openCards();
  };

  private setStep(step: Step) {
    this._step = step;
  }

  startOptionsStep() {
    this.setStep("options");
  }
  startPerformingStep() {
    this.setStep("performing");
  }

  startResourceStep(
    params: ResourcePrimitive[][],
    onSelect: (selected: ResourcePrimitive[]) => void
  ) {
    this.setStep("resources");
    this._params = params;
    this._onSelect = onSelect;
  }
}
