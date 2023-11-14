import { makeAutoObservable } from "mobx";
import { EngineeringCard } from "../Cards/engineering";
import { CardId, CardType, GeneralCard } from "../card-types";
import { ICardPlace } from "./ICardPlace";
import { BasicCard } from "../Cards";
import { GameStateCards } from "..";



export class TablePlace implements ICardPlace<BasicCard, CardId> {
    constructor(
        private prefix: CardType,
        private readonly cardsCollection: GameStateCards,
        gameId: string,

    ) {
        makeAutoObservable(this);
        /* makeAutoSavable(
            this,
            gameId,
            "prefix",
            ["cardsId"  as any],
            this.gameState.saveCondition
        );*/
    }

    private cardsOnTable: CardId[] = []
    tempEngineering: EngineeringCard[] = [];

    get cards(): readonly GeneralCard[] {
        return this.cardsOnTable.map(
            (card) => this.cardsCollection[card.type][card.id]
        )//.concat(this.tempEngineering);
    }

    //выписывает карту из места
    takeCard(card: CardId): GeneralCard {
        this.cardsOnTable = this.cardsOnTable.filter(el => el.id !== card.id)
        return this.cardsCollection[card.type][card.id]
    }

    //записывает карту в место
    placeCard(card: CardId) {
        if (card === undefined) return;
        this.cardsOnTable.push({ id: card.id, type: card.type });
    }
}