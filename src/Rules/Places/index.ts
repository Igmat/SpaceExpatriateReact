import { BasicCard } from "../Cards";
import { CardId, CardType } from "../card-types";

export abstract class BasicPlace<T extends BasicCard = BasicCard> {

    private _cards: CardId[] = [];
    protected abstract getCardInstance(id: number, type: CardType): T

    get cards(): readonly T[] {
        return this._cards.map(
            (card) => this.getCardInstance(card.id, card.type));
    }
    
    takeCard(id: number, type: CardType) {
        this._cards = this._cards.filter(
            (el) => el.id !== id && el.type !== type)
    }

    placeCard(id: number, type: CardType) {
        this._cards.push({ id, type });
    }
}