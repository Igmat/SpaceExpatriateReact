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

export type CardSource = "decks" | "hand" | "table";
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

  get deliveryManager(): DAM {
    return this.managers.delivery;
  }

  perform = (card?: CardDefinition) => {
    if (!card) return;

    if (this.round.phase !== "active") return;

    this.activeAction = card.type;
    this.table.takeCard(this.decks[card.type].takeOpenedCard()!);

    if (this.round.current < 5) {
      this.nextRound();
      return;
    }

    this.round.phase = card.type;
    this.colony.beforePerform(this.activeAction);
    this.managers[card.type].perform(card);
  };

  nextRound = () => {
    this.activeAction && this.colony.afterPerform(this.activeAction);
    this.round.next();
    this.activeAction && this.managers[this.activeAction].resetIsEnded();
    this.activeAction = undefined;
  };

  confirm = () => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].confirm(); 
    this.managers[this.activeAction].isEnded && this.nextRound();
  };

  activateDeck = (type: CardType) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateDeck(type);
    this.managers[this.activeAction].isEnded && this.nextRound();
  };

  activateCard = (card: number) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateCard(card);
    this.managers[this.activeAction].isEnded && this.nextRound();
  };

  activateColonyCard = (card: number) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].activateColonyCard(card);
    //this.managers[this.activeAction].confirm(); 
    this.managers[this.activeAction].isEnded && this.nextRound();
  };
//карты на столе игрока 
  activateCardOnTable = (card: CardDefinition) => {//возвращает boolean
    if (!this.activeAction) return;
    const result = this.managers[this.activeAction].activateCardOnTable(card);
   // this.managers[this.activeAction].confirm(); 
    this.managers[this.activeAction].isEnded && this.nextRound();
    return result
  };

  select = (option: string) => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].select(option);
    this.managers.military.select(option) && this.nextRound(); //заглушка
  };

  reset = () => {
    if (!this.activeAction) return;
    this.managers[this.activeAction].reset();
  };

  isInDeck = (card: CardDefinition): CardSource | undefined => {
    if (this.decks.findCard(card)) return "decks";
  };
  isInHand = (card: CardDefinition): CardSource | undefined => {
    if (
      this.hand.cardsInHand.some(
        (handCard) => handCard.id === card.id && card.type === handCard.type
      )
    )
      return "hand";
  };
  isOnTable = (card: CardDefinition): CardSource | undefined => {
    if (this.table.findCard(card)) return "table";
  };
  
get isDisabled(): (card: CardDefinition) => boolean {
  return (card: CardDefinition) => {
    const place = this.isInDeck(card) || this.isInHand(card) || this.isOnTable(card);

    if (!this.activeAction) return place === "decks" ? false : true;

    if (place === undefined) return true;

    return this.managers[this.activeAction].isDisabled(place, card);
  };
}
  
  get isDisabledDeck(): (type: CardType) => boolean {
    return (type: CardType) => {
      if (!this.activeAction) return true;
      return this.managers[this.activeAction].isDisabledDeck(type);
    };
  }
}
