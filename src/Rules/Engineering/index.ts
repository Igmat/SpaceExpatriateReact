import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { CardSource } from "../ActionManager";
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

  private _isEnded: boolean = false;

  confirm = () => {
      return true
  };
  perform = (card: CardDefinition) => {
    this._remaining.activateDeck = 1;
    this._remaining.activateCard = this.hand.cardsInHand.length > 0 ? 1 : 0;
    this.round.startPerformingStep();
  };

  get isEnded() {
    return this._remaining.activateDeck === 0 &&
    this._remaining.activateCard === 0
  }

  resetIsEnded() {
    this._isEnded = false;
  }
  activateDeck = (type: CardType) => {
    if (this._remaining.activateDeck === 0) return false;
    this._remaining.activateDeck--;
    this.table.takeCard(this.decks[type].takeCard());
  };

  activateCard = (card: number) => {
    if (this._remaining.activateCard === 0) return;
    this._remaining.activateCard--;
    this.table.takeCard(this.hand.dropCard(card));
  };

  activateColonyCard = (card: number) => {};
  activateCardOnTable = (card: CardDefinition) => false;

  select = (option: string) => {};

  reset = () => {};

  isDisabled = (place: CardSource, card: CardDefinition): boolean =>
    place === "hand" && this._remaining.activateCard ? false : true;

  isDisabledDeck = (type: CardType): boolean =>
    !this._remaining.activateDeck ? true : false;
}
