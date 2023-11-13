import { EngineeringCard } from "../Cards/engineering";
import { GeneralCard } from "../card-types";
import { ICardPlace } from "./ICardPlace";

export class TablePlace<T extends GeneralCard> implements ICardPlace {
    constructor(
        prefix: string,
        readonly cards: T,
        gameId: string,

    ) { //makeAutoSavable 
    }

    private cardsId: number[] = []
    tempEngineering: EngineeringCard[] = [];

    get fullCard(): readonly T[] {
        return this.cardsId.map(
            (id) => this.cards[id] //не работает изза типов
        ).concat(this.tempEngineering);
    }

    //откуда
    takeCard(card?: GeneralCard | undefined): GeneralCard | undefined{
        if (card === undefined) return;
        this.cardsId.push(card.id);
        this.placeCard(card)
        return card
    }

    //куда
    placeCard(card: GeneralCard) {
        card.placeNow = "table"
    }

    dropCards = (
        ...cards: (GeneralCard)[]
    ) => {
        this.cardsId = this.cardsId.filter(
            (id) => !cards.map((card) => card.id).includes(id)
        );
        return cards;
    };

}