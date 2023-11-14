import { makeAutoObservable } from "mobx";
import { BasicCard } from "../Cards";
import { CardType } from "../card-types";
import { GameStateCards } from "..";
import { BasicPlace } from ".";

export class HandPlace extends BasicPlace {
    protected getCardInstance(id: number, type: CardType): BasicCard {
        return this.cardsCollection[type][id]
    }
    constructor(
        private readonly cardsCollection: GameStateCards,
        gameId: string,

    ) {
        super()
        makeAutoObservable(this);
        //makeAutoSavable(this, gameId, "hand", ["_cardsInHand" as any], this.gameState.saveCondition); 
    }
}