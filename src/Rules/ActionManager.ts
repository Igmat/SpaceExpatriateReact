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
import { ColonyDeckModel } from "./Colony/ColonyDeckModel";

export class ActionManager {
  constructor(
    private readonly decks: DeckManager,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly gameId: string,
    private readonly colony: ColonyManager,
    private readonly colonyDeck: ColonyDeckModel
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
    terraforming: new TAM(
      this.round,
      this.table,
      this.decks,
      this.gameId,
      this.colony,
      this.colonyDeck,
      this.resources
    ),
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

  get currentManager() {
    return this.activeAction && this.managers[this.activeAction];
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
    this.colony.beforePerform(this.activeAction);
    this.currentManager?.perform(card);
  };

  nextRound = () => {
    this.activeAction && this.colony.afterPerform(this.activeAction);
    this.round.next();
    this.activeAction = undefined;
  };

  tryNext = () => this.currentManager?.tryNext() && this.nextRound();

  activateDeck = (type: CardType) => this.currentManager?.activateDeck(type);

  activateCard = (card: number) => this.currentManager?.activateCard(card);

  activateColonyCard = (card: number) => this.currentManager?.activateColonyCard(card);

  activateCardOnTable = (card: CardDefinition) => this.currentManager?.activateCardOnTable(card);

  select = (option: string) => this.currentManager?.select(option);

  reset = () => this.currentManager?.reset();


  get isDisabled(): (place: string, card: CardDefinition) => boolean {
    return (place: string, card: CardDefinition) => {
      if (!this.activeAction) return false;
      if (
        this.round.phase === "active" &&
        (place === "table" || place === "hand")
      )
        return true;
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
