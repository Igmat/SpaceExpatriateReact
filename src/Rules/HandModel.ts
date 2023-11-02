import { makeAutoObservable } from "mobx";
import { CardDefinition } from "../Rules/card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { GameState } from ".";

export class HandModel {
  public cardsInHand: CardDefinition[] = [];
  public tempDroppedCards: CardDefinition[] = [];

  constructor(private readonly gameState: GameState, gameId: string) {
    makeAutoObservable(this);
    
    const saveCondition = () => {
      if (this.gameState.round === undefined) return true;
      if (this.gameState.round.current < 5) return true;
      if (this.gameState.action.activeAction === undefined) return true;
      return false;
    };
    makeAutoSavable(this, gameId, "hand", ["cardsInHand"], saveCondition);
  }
  dropCard = (ind: number) => {
    const card = this.cardsInHand[ind];
    this.cardsInHand.splice(ind, 1);
    return card;
  };

  takeCard(card?: CardDefinition) {
    card && this.cardsInHand.push(card);
  }

  isInHand = (card: CardDefinition): boolean => {
    return this.cardsInHand.some(
      (handCard) => handCard.id === card.id && card.type === handCard.type
    );
  };
}
