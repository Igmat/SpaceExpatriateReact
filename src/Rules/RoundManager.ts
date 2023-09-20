import { makeAutoObservable, autorun } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType } from "./card-types";
import { ResourcesModel } from "./ResourcesModel";
import { writeToLS, readFromLS } from "../utils";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "done";

export class RoundManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel
  ) {
    makeAutoObservable(this);
    this.takeCardsToHand();
    if(this.current === 1) this.decks.openCards();
    autorun(() => {
      writeToLS("current", this.current);
      writeToLS("phase", this.phase);
      writeToLS("step", this.step);
    });
  }

  current =readFromLS("current") || 1;

  phase: Phase =readFromLS("phase") || "active";
  step?: Step =readFromLS("step") || undefined;
  startNewGame = () => {
    this.current = 1
  }
  takeCardsToHand = () => {
   // if (this.hand.cardsInHand.length === 0) {
    if (this.current === 1) {
      this.hand.cardsInHand = []
      this.hand.takeCard(this.decks.delivery.takeCard());
      this.hand.takeCard(this.decks.engineering.takeCard());
      this.hand.takeCard(this.decks.military.takeCard());
      this.hand.takeCard(this.decks.terraforming.takeCard());
    }
  };

  next = () => {
    this.current++;
    // console.log("Round: " + this.current + " is started");
    this.phase = "active";
    this.resources.calculateTotalPoints();
    this.step = undefined;
    this.decks.openCards()
  };


  
}
