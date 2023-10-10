import { makeAutoObservable } from "mobx";
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
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { ColonyManager } from "./Colony/ColonyManager";

export class ActionManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly gameId: string,
    private readonly colony: ColonyManager

  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, `action`, [`activeAction`]);
  }

  private managers = {
    engineering: new EAM(
      this.round,
      this.table,
      this.decks,
      this.hand,
      this.gameId
    ),
    terraforming: new TAM(this.round, this.table, this.decks, this.gameId, this.colony),
    delivery: new DAM(
      this.table,
      this.round,
      this.hand,
      this.resources,
      this.decks,
      this.gameId
    ),
    military: new MAM(this.round, this.hand, this.decks),
  };

  activeAction?: CardType;

  get deliveryManager(): DAM {
    return this.managers.delivery;
  }

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
    this.colony.beforePerform(card);
    this.managers[card.type].perform(card);
  };

  nextRound = () => {
    this.round.next();
    this.activeAction = undefined
  }

  tryNext = () => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].tryNext() && this.nextRound();
  };

  activateDeck = (type: CardType) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateDeck(type);
    //this.tryNext();
  };

  activateCard = (card: number) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateCard(card);

    // this.tryNext();
  };
 activateColonyCard = (card: number) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateColonyCard(card);
  }

  activateCardOnTable = (card: CardDefinition) => {
    if (!this.activeAction) return;
    return this.managers[this.activeAction].activateCardOnTable(card);
  };

  select = (option: string) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].select(option);
  };

  reset = () => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].reset();
  };

  get isDisabled(): (place: string, card: CardDefinition) => boolean {
    return (place: string, card: CardDefinition) => {
      if (!this.activeAction) return false;
      if (this.round.phase === "active" && (place === "table" || place === "hand")) return true;
      return this.managers[this.activeAction].isDisabled(place, card);
    };
  }
  get isDisabledDeck(): (type: CardType) => boolean {
    return (type: CardType) => {
      if (!this.activeAction) return false;
      if (this.round.phase === "active") return true;
      return this.managers[this.activeAction].isDisabledDeck(type);
    };
  }
}
