import { GeneralCard } from "../card-types";
import { ICardPlace } from "./ICardPlace";


export class TablePlace<T extends GeneralCard> implements ICardPlace {
    constructor(
        card: string, //T,
        gameId: string

    ){
     
    }

    takeCard(card?: GeneralCard | undefined): GeneralCard {
        throw new Error("Method not implemented.");
    }
    placeCard(card: GeneralCard): GeneralCard {
        throw new Error("Method not implemented.");
    }

}