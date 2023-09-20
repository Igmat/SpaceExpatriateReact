import { makeAutoObservable, autorun } from "mobx";
import { DeckManager } from "./DeckManager";
import { HandModel } from "./HandModel";
import { CardType, ResourcePrimitive } from "./card-types";
import { ResourcesModel } from "./ResourcesModel";
import localStorage from "mobx-localstorage";

type Phase = "active" | CardType | "passive";
type Step = "options" | "performing" | "resources"|"done";

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
      localStorage.setItem("current", this.current);
      localStorage.setItem("phase", this.phase);
      localStorage.setItem("step", this.step);
    });
  }

  current = localStorage.getItem("current") || 1;


  phase: Phase = localStorage.getItem("phase") || "active";
  step?: Step = localStorage.getItem("step") || undefined;
  params?: ResourcePrimitive[][];
  onSelect?: (selected: ResourcePrimitive[]) => void;
  
  startNewGame = () => {
    this.current = 1
  }
  takeCardsToHand = () => {
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
    this.resources.calculateTotalPoints()
    this.step = undefined;
    this.resources.resetRoundPoints() //обнуляем очки раунда
      this.decks.openCards()//вместо четырех вызовов 
   
  };


  
}
