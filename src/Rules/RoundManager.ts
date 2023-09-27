import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType, ResourcePrimitive } from "./card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "resources" | "done";

export class RoundManager {

  constructor(
    private readonly decks: DeckManager,
    private readonly hand: HandModel,
    gameId: string,
  ) {
    makeAutoObservable(this);
    const isLoaded = makeAutoSavable(this, gameId, "round",[
      "current",
      "phase",
       {key:"_step" as any, condition: (value) => value !== "resources"},
    
    ]);
    if (!isLoaded){
    this.hand.takeCard(this.decks.delivery.takeCard());
    this.hand.takeCard(this.decks.engineering.takeCard());
    this.hand.takeCard(this.decks.military.takeCard());
    this.hand.takeCard(this.decks.terraforming.takeCard());
    }
  }

  current = 1;
  phase: Phase = "active";
  private _step?: Step;
  private _params?: ResourcePrimitive[][];
  private _onSelect?: (selected: ResourcePrimitive[]) => void;

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
    this.decks.delivery.openCard();
    this.decks.engineering.openCard();
    this.decks.military.openCard();
    this.decks.terraforming.openCard();
  
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
