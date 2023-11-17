
import { CardType, GeneralCard } from "../card-types";
import { GameStateCards } from "..";
import { BasicPlace } from ".";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

export class HandPlace extends BasicPlace<GeneralCard> {
  protected getCardInstance(id: number, type: CardType): GeneralCard {
    return this.cardsCollection[type][id];
  }
  constructor(
    private readonly cardsCollection: GameStateCards,
    gameId: string
  ) {
    super();
    //makeAutoSavable(this, gameId, "hand", ["_cards" as any]/*, this.gameState.saveCondition*/);
  }
}
