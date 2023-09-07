import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType } from "./card-types";
import { ResourcesModel } from "./ResourcesModel";
import { type } from "os";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "done";
export type DeliveryOption = "charter" | "garbage";

export class RoundManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel
  ) {
    makeAutoObservable(this);
    this.hand.takeCard(this.decks.delivery.takeCard());
    this.hand.takeCard(this.decks.engineering.takeCard());
    this.hand.takeCard(this.decks.military.takeCard());
    this.hand.takeCard(this.decks.terraforming.takeCard());
  }

  current = 1;

  phase: Phase = "active";
  step?: Step;
  deliveryOption?: DeliveryOption; 

  nextPerformingStep = () => {
    this.step = "performing";
  };
  shooseDeliveryOption = (arg: DeliveryOption) => {
this.deliveryOption = arg
console.log(this.deliveryOption)
  }

  next = () => {
    this.current++;
   // console.log("Round: " + this.current + " is started");
    this.phase = "active";
    this.resources.dropResources();
    this.step = undefined;
    this.deliveryOption = undefined;
    this.decks.delivery.openCard();
    this.decks.engineering.openCard();
    this.decks.military.openCard();
    this.decks.terraforming.openCard();

  };
}
