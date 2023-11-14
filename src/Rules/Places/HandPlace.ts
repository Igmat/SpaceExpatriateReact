import { makeAutoObservable } from "mobx";
import { BasicCard } from "../Cards";
import { CardId, GeneralCard } from "../card-types";
import { ICardPlace } from "./ICardPlace";
import { GameStateCards } from "..";

export class HandPlace implements ICardPlace<BasicCard, CardId> {
    constructor(
        private readonly cardsCollection: GameStateCards,
        gameId: string,

    ) {
        makeAutoObservable(this);
        //makeAutoSavable(this, gameId, "hand", ["_cardsInHand" as any], this.gameState.saveCondition); 
    }

    private _cardsInHand: CardId[] = [];

    get cardsInHand(): readonly GeneralCard[] {
        return this._cardsInHand.map(
            (card) => this.cardsCollection[card.type][card.id]);
    }

    //выписывает карту из места
    takeCard(card: CardId): GeneralCard {
        this._cardsInHand = this._cardsInHand.filter(
            (el) => el.id !== card.id && el.type !== card.type)
        return this.cardsCollection[card.type][card.id]
    }

    //записывает карту в место
    placeCard(card: CardId) {
        if (card === undefined) return;
        this._cardsInHand.push({ id: card.id, type: card.type });
    }
}