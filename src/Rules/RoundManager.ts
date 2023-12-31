import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType } from "./card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { ColonyDeckModel } from "./Colony/ColonyDeckModel";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "resources" | "done";

export class RoundManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly hand: HandModel,
    private readonly colonyDeck: ColonyDeckModel,
    gameId: string,
  ) {
    makeAutoObservable(this);
    if (!gameId) return;
    const isLoaded = makeAutoSavable(this, gameId, "round", [
      "current",
      // "phase",
      // { key: "_step" as any, condition: (value) => value !== "resources" },
    ]);
    if (!isLoaded) {
      this.hand.takeCard(this.decks.delivery.takeCard());
      this.hand.takeCard(this.decks.engineering.takeCard());
      this.hand.takeCard(this.decks.military.takeCard());
      this.hand.takeCard(this.decks.terraforming.takeCard());
    }
  }

  current = 1;
  phase: Phase = "active";
  private _step?: Step;

  get step() {
    return this._step;
  }

  next = () => {
    this.current++;
    this.phase = "active";
    this._step = undefined;
    this.decks.delivery.openCard();
    this.decks.engineering.openCard();
    this.decks.military.openCard();
    this.decks.terraforming.openCard();
    this.colonyDeck.openCard();
  };

  private setStep(step: Step) {
    this._step = step;
  }
  
  startPerformingStep() {
    this.setStep("performing");
  }

  startOptionsStep() {
    this.setStep("options");
  }

  get isResetable(): boolean {
    return (
      (this.phase === "delivery" || this.phase === "terraforming") &&
      this.step === "performing"
    );
  }

  get isConfirmable(): boolean {
    return this.step === "performing" && (this.phase === "delivery" || this.phase === "terraforming");
  }
  get isEndable(): boolean {
    return this.step === "performing" && (this.phase === "military" || this.phase === "engineering");
  }
}
