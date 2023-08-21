export class DeckModel<T extends {id: number}> {

    constructor(cardsDefinitions: { [key: number]: T }) {
        this.#cardsDefinitions = cardsDefinitions;
        this.#activeCards = Object.keys(this.#cardsDefinitions);
        this.#mixCards();
    }
    
    #activeCards: number[];
    #cardsDefinitions: { [key: number]: T }; 
    #droppedCards: number[] = [];

    openedCard?: T;

    openCard() {
        this.openedCard !== undefined && this.dropCards(this.openedCard.id);
        this.openedCard = this.takeCard();
    }

    takeOpenedCard() {
        console.log("takeOpenedCard")
        const result = this.openedCard;
        this.openedCard = undefined;
        return result;
    }

    takeOpenedCardAndOpenNew() {
        console.log("takeOpenedCardandOpenNew")
        const result = this.takeOpenedCard();
        this.openCard();
        return result;
    }

    #mixCards() {
        
        const result: number[] = [];
        const restCards = [...this.#activeCards];

        while (restCards.length > 0) {
            const randomIndex = Math.floor(Math.random() * restCards.length);
            result.push(restCards[randomIndex]);
            restCards.splice(randomIndex, 1);
        }
        this.#activeCards = result;
    }

    takeCard(): T {
        console.log("takeCard")
        const idOfCard = this.#activeCards.pop()!;
        if (this.#activeCards.length === 0) {
            this.#activeCards = this.#droppedCards;
            this.#mixCards();
        } 
        return this.#cardsDefinitions[idOfCard];
    }

    dropCards(...cards: number []) {
        this.#droppedCards.push(...cards);
    }
}