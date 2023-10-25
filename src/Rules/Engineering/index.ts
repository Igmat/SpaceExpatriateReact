import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

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

  perform = (card: CardDefinition) => {
    this.adjustRemainingActivateDeck(1);
    this.adjustRemainingActivateCard(this.hand.cardsInHand.length > 0 ? 1 : 0);
    this.round.startPerformingStep();
  };
  
  tryNext = () =>
    this._remaining.activateDeck === 0 && this._remaining.activateCard === 0;

  activateDeck = (type: CardType) => {
    if (this._remaining.activateDeck === 0) return;
    this.adjustRemainingActivateDeck(-1);
    this.table.takeCard(this.decks[type].takeCard());
    return this.tryNext();
  };

  activateCard = (card: number) => {
    if (this._remaining.activateCard === 0) return;
    this._remaining.activateCard--;
    this.table.takeCard(this.hand.dropCard(card));
    return this.tryNext();
  };

  activateColonyCard = (card: number) => {};
  activateCardOnTable = async (card: CardDefinition) => false;

  select = (option: string) => {};

  reset = () => {};
  isDisabled(place: string, card: CardDefinition): boolean {
    if (this.round.phase === "engineering") {
      if (place === "table") return true;
      if (place === "hand" && this._remaining.activateCard === 0) return true;
      if (place === "opened") return true;
    }
    return false;
  }

  isDisabledDeck = (type: CardType): boolean => {
    if (
      this.round.phase === "engineering" &&
      this._remaining.activateDeck === 0
    )
      return true;
    return false;
  };


}
