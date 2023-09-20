import { makeAutoObservable, autorun } from "mobx";
import { DeckManager } from "./DeckManager";
import { CardDefinition, CardType } from "./card-types";
import { TableModel } from "./TableModel";
import { RoundManager } from "./RoundManager";
import { HandModel } from "./HandModel";
import { ResourcesModel } from "./ResourcesModel";
import { ActionManager as EAM } from "./Engineering";
import { ActionManager as TAM } from "./Terraforming";
import { ActionManager as DAM } from "./Delivery";
import { ActionManager as MAM } from "./Military";
import { writeToLS, readFromLS } from "../utils";//new
export class ActionManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel
  ) {
    makeAutoObservable(this);
    autorun(() => {
      writeToLS("activeAction", this.activeAction);
    });
  }

  private managers = {
    engineering: new EAM(this.round, this.table, this.decks, this.hand),
    terraforming: new TAM(this.round, this.table, this.decks),
    delivery: new DAM(this.table, this.round, this.hand, this.resources, this.decks),
    military: new MAM(this.round, this.hand, this.decks)
  }

  activeAction?: CardType = readFromLS("activeAction");

  perform = (card?: CardDefinition) => {
    if (!card) return;

    if (this.round.phase !== "active") return;

    this.activeAction = card.type;
    this.table.takeCard(this.decks[card.type].takeOpenedCard()!);

    if (this.round.current < 5) {
      this.round.next();
      
      return;
    }

    this.round.phase = card.type;
    console.log(this.round.phase);

    this.managers[card.type].perform(card)
  };

  tryNext = () => {

    if (!this.activeAction) return;
    console.log('Im trying next in Action')
    this.managers[this.activeAction].tryNext() && this.round.next();

  };

  activateDeck = (type: CardType) => {
    if (!this.activeAction) return;
     this.managers[this.activeAction].activateDeck(type)
    //this.tryNext();
  };

  activateCard = (card: number) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateCard(card)
    
    // this.tryNext();
  };

  activateCardOnTable = (card: CardDefinition) => {
    if (!this.activeAction) return;
    return this.managers[this.activeAction].activateCardOnTable(card)
  }

  select = (option: string) => {
    if (!this.activeAction) return;
     this.managers[this.activeAction].select(option)
  }

  reset = () => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].reset()
  };
}
