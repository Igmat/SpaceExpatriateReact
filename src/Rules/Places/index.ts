import { makeObservable, computed, action, observable } from "mobx";
import { BasicCard } from "../Cards";
import { CardId, CardType } from "../card-types";

export abstract class BasicPlace<T extends BasicCard = BasicCard> {

    private _cards: CardId[] = [];

    constructor() {
        makeObservable(this, {
            ["_cards" as any]: observable,
            cards: computed,
            isEmpty: computed,
            takeCard: action.bound,
            placeCard: action.bound,
        })
    }

    protected abstract getCardInstance(id: number, type: CardType): T

    get cards(): readonly T[] {
        return this._cards.map(
            (card) => this.getCardInstance(card.id, card.type));
    }
    // выписываем карту
    takeCard(id: number, type: CardType) {
        this._cards = this._cards.filter(
            (el) => el.id !== id || el.type !== type)
    }
    // вписываем карту
    placeCard(id: number, type: CardType) {
        this._cards.push({ id, type });
    }
    get isEmpty () {
        return this._cards.length === 0;
    }
}