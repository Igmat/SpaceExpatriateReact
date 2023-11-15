import { BasicPlace } from ".";
import { GameStateCards } from "..";
import { BasicCard } from "../Cards";
import { CardType } from "../card-types";

// Delivery Phase

export class TempDroppedCardsPlace extends BasicPlace {
    
    protected getCardInstance(id: number, type: CardType): BasicCard {
        return this.cardsCollection[type][id]
    }

    constructor(
        private readonly cardsCollection: GameStateCards,
        gameId: string,

    ) {
        super()
        //makeAutoObservable(this);
        //makeAutoSavable(this, gameId, "hand", ["_cardsInHand" as any], this.gameState.saveCondition); 
    }

}