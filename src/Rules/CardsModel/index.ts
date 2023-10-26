import { CardType, ColonyCard } from "../card-types";
import { makeAutoObservable } from "mobx";
import { CardDefinition } from "../card-types";
import { GeneralCardDefinition } from "../CardDefinitions/createCards";
export class CardsModel {

    constructor (
        id: number,
        type: GeneralCardDefinition
    ) {
       // makeAutoObservable(this);

}

test(){
console.log('!!!!!!!!!!!!')
}

}