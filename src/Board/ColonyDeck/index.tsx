import { ColonyDeckModel } from '../../Rules/Colony/ColonyDeckModel';
import { ColonyCard } from '../../Rules/card-types';
import { CCard } from "../../components/ColonyCard";
import styles from "./ColonyDeck.module.scss";
import { observer } from "mobx-react-lite";

interface ColonyDeckProps {
    colony: ColonyDeckModel<ColonyCard>;
}

export const ColonyDeck = observer((props: ColonyDeckProps) => {

    return (
        <div className={styles.colonyCards}>
            {props.colony.openedCards.map((card, ind) => (
                <CCard
                    key={ind}
                    {...card}
                    onOpenCardClick={() => console.log("clicked")}
                />))
            }
        </div>
    );
});
