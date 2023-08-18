import styles from './Hand.module.scss';
import { CardDefinition } from '../../Rules/card-types';
import { Card } from '../../components/Card';

interface HandProps {
    cards: CardDefinition[]
}

export const Hand = (props: HandProps) => {
    return (
        <div className={styles.container}>
            {props.cards.map(card => <Card {...card} />)}
        </div>
    )
}