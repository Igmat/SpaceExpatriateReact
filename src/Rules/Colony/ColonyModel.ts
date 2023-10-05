import { makeAutoObservable } from "mobx";
import { ColonyCard } from "../card-types";

export class ColonyModel<T extends { id: number }> {
    constructor(
        public readonly type: ColonyCard,
        private readonly cardsDefinitions: { [key: number]: T },
    ) {
        makeAutoObservable(this)
    }

    private _activeCards: number[] = [];
    openedCard?: T;

    initialize = () => {
        this._activeCards = Object.keys(this.cardsDefinitions);
        this.mixCards();
        this.openCard();
    }

    openCard() {
        this.openedCard = this.takeCard();
    }

    takeOpenedCard() {
        const result = this.openedCard;
        this.openedCard = undefined;
        return result;
    }

    takeCard = (): T => {
        const idOfCard = this._activeCards.pop()!;
        if (this._activeCards.length === 0) {
            //игра заканчивается, подсчитываются очки - метод нужен позже
            // this.mixCards();
        }
        return this.cardsDefinitions[idOfCard];
    };

    mixCards() {
        const result: number[] = [];
        const restCards = [...this._activeCards];

        while (restCards.length > 0) {
            const randomIndex = Math.floor(Math.random() * restCards.length);
            result.push(restCards[randomIndex]);
            restCards.splice(randomIndex, 1);
        }
        this._activeCards = result;
    }
}