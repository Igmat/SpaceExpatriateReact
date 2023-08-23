import { observer } from 'mobx-react-lite';
import { Card } from '../../components/Card';
import { HandModel } from '../../Rules/HandModel';
import { DeckManager } from '../../Rules/DeckManager';
import styles from './Hand.module.scss';

interface HandProps {
    decks: DeckManager
    model: HandModel
}

export const Hand = observer((props: HandProps) => {
    return (
        <div className={styles.container}>
            {props.model.cardsInHand.map((card, ind) =>
                <Card key={ind}{...card} onClick={() =>
                    props.decks.dropCards(props.model.dropCard(ind))
                } />)}
        </div>
    )
})
