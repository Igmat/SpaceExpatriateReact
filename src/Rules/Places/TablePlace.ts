import { makeAutoObservable } from "mobx";
import { EngineeringCard } from "../Cards/engineering";
import { CardType, GeneralCard } from "../card-types";
import { ICardPlace } from "./ICardPlace";
import { BasicCard } from "../Cards";

export class TablePlace<T extends BasicCard> implements ICardPlace<T> {
    constructor(
        private prefix: CardType,
        private readonly cardsCollection: { [key: number]: T },
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

    private cardsId: number[] = []
    tempEngineering: EngineeringCard[] = [];

    get cards(): readonly T[] {
        return this.cardsId.map(
            (id) => this.cardsCollection[id]
        )//.concat(this.tempEngineering);
    }

    //выписывает карту из места
    takeCard(id: number): T {
        this.cardsId = this.cardsId.filter(el => el !== id)
        return this.cardsCollection[id]
    }

    //записывает карту в место
    placeCard(card: T) {
        if (card === undefined) return;
        this.cardsId.push(card.id);
    }
}