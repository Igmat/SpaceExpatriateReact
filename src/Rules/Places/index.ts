import { BasicCard } from "../Cards";
import { CardId, CardType } from "../card-types";

export abstract class BasicPlace<T extends BasicCard = BasicCard> {

    private _cards: CardId[] = [];

    protected abstract getCardInstance(id: number, type: CardType): T

    get cards(): readonly T[] {
        return this._cards.map(
            (card) => this.getCardInstance(card.id, card.type));
    }
    // выписываем карту
    takeCard(id: number, type: CardType) {
        this._cards = this._cards.filter(
            (el) => el.id !== id && el.type !== type)
    }
    // вписываем карту
    placeCard(id: number, type: CardType) {
        this._cards.push({ id, type });
    }
    // выписываем карту
    take(card: CardId) {
        this._cards = this._cards.filter(
            (el) => el.id !== card.id && el.type !== card.type)
    }
    // вписываем карту
    place(card: CardId) {
        this._cards.push(card);
    }

    get ids(): readonly CardId[] {
        return this._cards;
    }
    get isEmpty () {
        return this._cards.length === 0;
    }
}