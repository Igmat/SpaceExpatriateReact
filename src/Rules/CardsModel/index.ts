import { CardType } from "../card-types";
import { makeAutoObservable } from "mobx";

export class CardsModel {
    constructor (
        id: string,
        type: CardType
    ) {
        makeAutoObservable(this);

}}