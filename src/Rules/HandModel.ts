import { makeAutoObservable } from "mobx";
import { CardDefinition } from "../Rules/card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { GameState } from ".";

export class HandModel {
  public cardsInHand: CardDefinition[] = [];
  public tempDroppedCards: CardDefinition[] = [];

  constructor(private readonly gameState: GameState, gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "hand", ["cardsInHand"], this.gameState.saveCondition);
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
