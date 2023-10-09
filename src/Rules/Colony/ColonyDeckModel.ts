import { makeAutoObservable } from "mobx";

export class ColonyDeckModel<T extends { id: number }> {
    constructor(

        private readonly cardsDefinitions: { [key: number]: T },
        gameId: string,
    ) {
        makeAutoObservable(this)
        this.initialize();
    }

    private _activeCards: number[] = [];
    openedCards: T[] = [];

    initialize = () => {
        this._activeCards = Object.keys(this.cardsDefinitions);
        this.mixCards();

        // cut out 3 cards from the active Cards and put them to the opened Cards
        this.openedCards = this._activeCards.splice(0, 3).map(id => this.cardsDefinitions[id]);
    }

    openCard() {
        this.openedCards.push(this.takeCard());
    }

    takeCard = (): T => {
        const idOfCard = this._activeCards.pop()!;
        if (this._activeCards.length === 0) {
            //игра заканчивается, подсчитываются очки - метод нужен позже
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