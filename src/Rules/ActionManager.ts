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

  perform = async (card?: CardDefinition) => {
    if (!card) return;

    if (this.round.phase !== "active") return;

    this.activeAction = card.type;
    this.table.takeCard(this.decks[card.type].takeOpenedCard()!);

    if (this.round.current < 5) {
      this.nextRound();
      return;
    }

    this.round.phase = card.type;
    await this.colony.triggers.before(this.activeAction);
    this.currentManager?.perform(card);
    await this.colony.triggers.afterPerform(this.activeAction);
  };

  nextRound = () => {
    this.activeAction && this.colony.triggers.after(this.activeAction);
    this.round.next();
    this.activeAction = undefined;
  };

  tryNext = () => this.currentManager?.tryNext() && this.nextRound();

  activateDeck = async (type: CardType) => {
    this.currentManager?.activateDeck(type) && this.nextRound();
  };

  activateCard = (card: number) =>
    this.currentManager?.activateCard(card) && this.nextRound();

  activateColonyCard = (card: number) =>
    this.currentManager?.activateColonyCard(card) && this.nextRound();

  activateCardOnTable = (card: CardDefinition) =>
    this.currentManager?.activateCardOnTable(card);

  select = async (option: string) => {
    if (!this.activeAction) return;
    await this.colony.triggers.beforeSelect(this.activeAction);
    this.currentManager?.select(option);
    await this.colony.triggers.afterSelect(this.activeAction);
  };

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
    console.log(this.activeAction);
    return (type: CardType) => {
      if (!this.activeAction) return false;
      if (this.round.phase === "active") return true;
      return this.managers[this.activeAction].isDisabledDeck(type);
    };
  }
}
