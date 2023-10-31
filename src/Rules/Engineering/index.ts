import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

//не заканчивается раунд
export class ActionManager implements IActionManager {
  constructor(
    private readonly round: RoundManager,
    private readonly table: TableModel,
    private readonly decks: DeckManager,
    private readonly hand: HandModel,
    gameId: string
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "engineeringManager", ["_remaining" as any]);
  }

  private _remaining = {
    activateDeck: 0,
    activateCard: 0,
  };

  get remaining() {
    return this._remaining;
  }
  adjustRemainingActivateDeck = (value: number) => {
    this._remaining.activateDeck += value;
  };
  adjustRemainingActivateCard = (value: number) => {
    this._remaining.activateCard += value;
  };

  perform = async (card: CardDefinition) => {
    this.adjustRemainingActivateDeck(1);
    this.adjustRemainingActivateCard(this.hand.cardsInHand.length > 0 ? 1 : 0);
    this.round.startPerformingStep();
  };

  get isEnded() {
    return (
      this._remaining.activateDeck === 0 && this._remaining.activateCard === 0
    );
  }
  confirm = async () => {};

  activateDeck = (type: CardType) => {
    if (this._remaining.activateDeck === 0) return;
    this.adjustRemainingActivateDeck(-1);
    this.table.takeCard(this.decks[type].takeCard());
    //return this.tryNext();
  };

  activateCard = (card: number) => {
    if (this._remaining.activateCard === 0) return;
    this._remaining.activateCard--;
    this.table.takeCard(this.hand.dropCard(card));
    // return this.tryNext();
  };

  activateColonyCard = (card: number) => {};
  activateCardOnTable = async (card: CardDefinition) => false;

  reset = async () => {};

  isDisabled = (card: CardDefinition): boolean =>
    this.hand.isInHand(card) && this._remaining.activateCard ? false : true;

  isDisabledDeck = (type: CardType): boolean =>
    !this._remaining.activateDeck ? true : false;
}
