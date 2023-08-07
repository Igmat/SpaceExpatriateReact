import styles from './Hand.module.scss';
import { CardDefinition } from '../../card-types';
import { Card } from '../../components/Card';

interface HandProps {
    cards: CardDefinition[]
}

export const Hand = (props: HandProps) => {
    return (
        <>
            {props.cards.map(card => <Card {...card} />)}
        </>
    )
}