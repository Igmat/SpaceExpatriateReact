import { DeckModel } from '../../Rules/DeckModel';
import styles from './Deck.module.scss';

interface DeckProps {
    type: 'delivery' | 'engineering' | 'terraforming' | 'military',
    order?: number[]
    onOpenClick?: () => void
    onClosedClick?: () => void
}



const DeliveryDeck = new DeckModel({
    1: {
        id: 1,
        type: 'delivery',
        resources: ['biotic materials', 'biotic materials'],
    },
    2: {
        id: 2,
        type: 'delivery',
        resources: ['fuel', 'fuel'],
    },
    3: {
        id: 3,
        type: 'delivery',
        resources: ['minerals', 'minerals'],
    },
    4: {
        id: 4,
        type: 'delivery',
        resources: ['machinery'],
    },
    5: {
        id: 5,
        type: 'delivery',
        resources: ['nanotechnologies'],
    },
});

export const Deck = (props: DeckProps) => {
    return (

        <>
        <div className={`${styles[props.type]} ${styles.deck}`} onClick={props.onClosedClick}>
        </div>
        <div className={`${styles[props.type]} ${styles.deck} ${styles.open}`} onClick={props.onOpenClick}>
     
        </div>
        </>
    )
}