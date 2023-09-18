import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType, ResourcePrimitive } from "./card-types";
import { ResourcesModel } from "./ResourcesModel";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "resources"|"done";

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
  params?: ResourcePrimitive[][];
  onSelect?: (selected: ResourcePrimitive[]) => void;


  next = () => {
    this.current++;
    // console.log("Round: " + this.current + " is started");
    this.phase = "active";
    this.resources.calculateTotalPoints()
    this.step = undefined;
    this.resources.resetRoundPoints() //обнуляем очки раунда
    this.decks.delivery.openCard();
    this.decks.engineering.openCard();
    this.decks.military.openCard();
    this.decks.terraforming.openCard();
  };
}
