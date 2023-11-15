import { makeAutoObservable } from "mobx";
import { DeckManager } from "./DeckManager";
import { CardType, GeneralCard } from "./card-types";
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
import { ModalManager } from "./ModalManager";
import { GameState } from ".";

export class ActionManager {
  constructor(
    private readonly gameState: GameState,
    private readonly decks: DeckManager,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly gameId: string,
    private readonly colony: ColonyManager,
    private readonly colonyDeck: ColonyDeckModel,
    private readonly modal: ModalManager,
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, `action`, [`activeAction`],this.gameState.saveCondition);
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
      this.resources,
      this.modal,
      this.hand
    ),
    delivery: new DAM(
      this.gameState,
      this.table,
      this.round,
      this.hand,
      this.resources,
      this.decks,
      this.modal,
      this.gameId
    ),
    military: new MAM(this.round, this.hand, this.decks, this.modal),
  };

  activeAction?: CardType;

  get currentManager() {
    return this.activeAction && this.managers[this.activeAction];
  }

  perform = async (card?: GeneralCard) => {
    if (!card) return;
    if (this.round.phase !== "active") return;
    this.activeAction = card.type;
    card.move(this.table.columns[card.type])

    if (this.round.current < 5) {
      this.nextRound();
      return;
    }

    this.round.phase = card.type;
    await this.colony.triggers.before(this.activeAction);
    await this.currentManager?.perform(card);
    await this.colony.triggers.afterSelect(this.activeAction);
  };

  nextRound = async () => {
    this.activeAction && (await this.colony.triggers.after(this.activeAction));
    this.colony.cancelActiveEffects();
    this.round.next();
    this.activeAction = undefined;
  };

  confirm = async () => {
    await this.currentManager?.confirm();
    this.currentManager?.isEnded && await this.nextRound();
  };

  activateDeck = async (type: CardType) => {
    this.currentManager?.activateDeck(type);
    this.currentManager?.isEnded && await this.nextRound();
  };

  activateCard = async (card: number) => {
    this.currentManager?.activateCard(card);
    this.currentManager?.isEnded && await this.nextRound();
  };

  activateColonyCard = async (card: number) => {
    this.currentManager?.activateColonyCard(card);
    this.currentManager?.isEnded && await this.nextRound();
  };

  activateCardOnTable = async (card: GeneralCard) => {
    await this.currentManager?.activateCardOnTable(card);
    this.currentManager?.isEnded && await this.nextRound();
  };

  reset = async () => await this.currentManager?.reset();

  get isDisabled(): (card:GeneralCard) => boolean {
    return (card:GeneralCard) => {
      if (!this.activeAction) return !this.decks.isInDeck(card);
      return this.managers[this.activeAction].isDisabled(card);
    };
  }

  get isDisabledDeck(): (type: CardType) => boolean {
    return (type: CardType) => {
      if (!this.activeAction) return true;
      return this.managers[this.activeAction].isDisabledDeck(type);
    };
  }
}
