import { ColonyManager } from '../../Rules/Colony/ColonyManager';
import { CCard } from "../../components/ColonyCard";
import styles from "./ColonyDeck.module.scss";
import { observer } from "mobx-react-lite";

interface ColonyDeckProps {
    colony: ColonyManager;
}

export const ColonyDeck = observer((props: ColonyDeckProps) => {

    /* const onOpenCardClickHandler = () => {
         console.log(props);
 
         props.colony.openNewCardAfterRound()
     }
     */

    return (
        <div className={styles.colonyCards}>
            {props.colony.colonyDeck.openedCards.map((card, ind) => (
                <CCard
                    key={ind}
                    {...card}
                />))
            }
        </div>
    );
});
