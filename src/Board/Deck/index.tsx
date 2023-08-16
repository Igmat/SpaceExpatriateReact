import styles from './Deck.module.scss';
import { DeliveryCard } from '../../card-types';

interface DeckProps {
    type: 'delivery' | 'engineering' | 'terraforming' | 'military',
    order?: number[]
}

const deliveryCards: { [key: number]: DeliveryCard } = {
    1: {
        type: 'delivery',
        resources: ['biotic materials', 'biotic materials'],
    },
    2: {
        type: 'delivery',
        resources: ['fuel', 'fuel'],
    },
    3: {
        type: 'delivery',
        resources: ['minerals', 'minerals'],
    },
    4: {
        type: 'delivery',
        resources: ['machinery'],
    },
    5: {
        type: 'delivery',
        resources: ['nanotechnologies'],
    },
}

const card = deliveryCards[4]

const allCardIds = Object.keys(deliveryCards);

const mixCards = (cards: number[]): number[] => {
    /*
    if (cards.length === 0) {
        return []
    }
    const randomIndex = Math.floor(Math.random() * cards.length);

    const newDeck = [...cards].splice(randomIndex, 1);
    const restMixedcards = mixCards(newDeck);
    return [cards[randomIndex], ...restMixedcards];
    */
    
    const result: number[] = [];
    const restCards = [...cards];

    while (restCards.length > 0) {
        const randomIndex = Math.floor(Math.random() * restCards.length);
        result.push(restCards[randomIndex]);
        restCards.splice(randomIndex, 1);
    }

    return result;
}

const takeCard = (cards: number[]) => {
    const idOfCard = cards.pop();
    if (idOfCard === undefined) return;
    return deliveryCards[idOfCard];
}

export const Deck = (props: DeckProps) => {
    return (
        <div className={`${styles[props.type]} ${styles.deck}`}>

        </div>
    )
}

// превратить в класс DeliveryDeck и создать сброс карт