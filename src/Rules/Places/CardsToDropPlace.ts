import { BasicPlace } from ".";
import { GameStateCards } from "..";
import { CardType, GeneralCard } from "../card-types";

// Terraforming Phase

export class CardsToDropPlace extends BasicPlace<GeneralCard> {
    protected getCardInstance(id: number, type: CardType): GeneralCard {
        return this.cardsCollection[type][id]
    }

    constructor(
        private readonly cardsCollection: GameStateCards,
    ) {
        super()
        //makeAutoObservable(this);
        //makeAutoSavable(this, gameId, "hand", ["_cardsInHand" as any], this.gameState.saveCondition); 
    }

    get cardsInDropPlace() {
        return this.cards
    }

}