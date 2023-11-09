import styles from "./Table.module.scss";
import { TableModel } from "../../Rules/TableModel";
import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card";
import { ActionManager } from "../../Rules/ActionManager";
import { RoundManager } from "../../Rules/RoundManager";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import { GeneralCard, CardTypes } from "../../Rules/card-types";
import { ResetButton } from "../../components/ResetButton";
import { ColonyCard } from "../../components/ColonyCard";
import { ColonyManager } from "../../Rules/Colony/ColonyManager";

interface TableProps {
  model: TableModel;
  round: RoundManager;
  action: ActionManager;
  resources: ResourcesModel;
  colony: ColonyManager;
}

export const Table = observer((props: TableProps) => {
  const handleClick = (card: GeneralCard) => {
   // console.log(card)
    props.action.activateCardOnTable(card);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {props.colony.colonies.map((card, ind) => (
          <ColonyCard key={ind} {...card} />
        ))}
      </div>
      <div className={styles.round}>{"Round: " + props.round.current}</div>

      {CardTypes.map(
        (el) => (
          <div className={styles.cardsContainer} key={el}>
            {props.model[el].map((card, ind) => (
              <Card
                key={ind}
              //  {...card}
              model={card}
                onClick={() => handleClick(card)}
                action={props.action} />
            ))}
          </div>
        )
      )}
      {props.round.isResetable && <ResetButton action={props.action} />}
      {props.round.isConfirmable && (
        <button className={styles.endTurnButton} onClick={props.action.confirm}>
          Confirm
        </button>
      )}
      {props.round.isEndable && (
        <button className={styles.endTurnButton} onClick={props.action.confirm}>
          End turn
        </button>
      )}
    </div>
  );
});
