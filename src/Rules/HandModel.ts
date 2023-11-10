import { makeAutoObservable } from "mobx";
import { CardDefinition, CardId} from "../Rules/card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { GameState } from ".";



export class HandModel {
  private _cardsInHand: CardId[] = [];
  public tempDroppedCards: CardDefinition[] = [];

  constructor(private readonly gameState: GameState, gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "hand", ["_cardsInHand" as any], this.gameState.saveCondition);
  }
  
  get cardsInHand(): readonly CardDefinition[] {
    return this._cardsInHand.map((cardId) => this.gameState.cards[cardId.type][cardId.id]);
  }

  dropCard = (ind: number) => {
    const card = this._cardsInHand[ind];
    this._cardsInHand.splice(ind, 1);
    return this.gameState.cards[card.type][card.id];
  };

  takeCard(card?: CardDefinition) {
    card && this._cardsInHand.push({id:card.id, type: card.type});
  }

  isInHand = (card: CardDefinition): boolean => {
    return this.cardsInHand.some(
      (handCard) => handCard.id === card.id && card.type === handCard.type
    );
  };
}
