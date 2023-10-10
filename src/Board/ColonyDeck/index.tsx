import { ActionManager } from '../../Rules/ActionManager';
import { ColonyDeckModel } from '../../Rules/Colony/ColonyDeckModel';
import { TableModel } from '../../Rules/TableModel';
import { CCard } from "../../components/ColonyCard";
import styles from "./ColonyDeck.module.scss";
import { observer } from "mobx-react-lite";

interface ColonyDeckProps {
    colony: ColonyDeckModel;
    table: TableModel;
    action: ActionManager;
}

export const ColonyDeck = observer((props: ColonyDeckProps) => {
    return (
        <div className={styles.colonyCards}>
            {props.colony.openedCards.map((card, ind) => (
                <CCard
                    key={ind}
                    {...card}
                    onOpenCardClick={() => props.action.activateCard(ind)}
                />))
            }
        </div>
    );
});
