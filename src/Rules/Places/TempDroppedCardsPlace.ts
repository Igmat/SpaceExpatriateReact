import { BasicPlace } from ".";
import { GameStateCards } from "..";
import { BasicCard } from "../Cards";
import { CardType } from "../card-types";

// Delivery Phase

export class TempDroppedCardsPlace extends BasicPlace {
    push(card: any) {
        throw new Error("Method not implemented.");
    }
    forEach(arg0: (card: any) => any) {
        throw new Error("Method not implemented.");
    }
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