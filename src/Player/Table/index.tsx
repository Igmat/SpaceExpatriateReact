import styles from "./Table.module.scss";
import { TableModel } from "../../Rules/TableModel";
import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card";
import { ActionManager } from "../../Rules/ActionManager";
import { RoundManager } from "../../Rules/RoundManager";
import { ResourcesModel } from "../../Rules/ResourcesModel";
import { CardDefinition } from "../../Rules/card-types";
import { ResetButton } from "../../components/ResetButton";
import { CCard } from "../../components/ColonyCard";

interface TableProps {
  model: TableModel;
  round: RoundManager;
  action: ActionManager;
  resources: ResourcesModel;
}

export const Table = observer((props: TableProps) => {
  const handleClick = (card: CardDefinition) => {
    props.action.activateCardOnTable(card);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {props.model.colony.map((card, ind) => (
          <CCard key={ind} {...card} />
        ))}
      </div>
      <div className={styles.round}>{"Round: " + props.round.current}</div>
      
      {(["delivery", "engineering", "terraforming", "military"] as const).map(
        (el) => (
          <div className={styles.cardsContainer}>
            {props.model[el].map((card, ind) => (
              <Card
                key={ind}
                {...card}
                onClick={() => handleClick(card)}
                isDisabled={props.action.isDisabled("table", card)}
              />
            ))}
          </div>
        )
      )}

      {props.round.isResetable && <ResetButton action={props.action} />}
      {props.round.step === "performing" && (
        <button className={styles.endTurnButton} onClick={props.action.tryNext}>
          {props.round.isConfirmable ? "Confirm" : "End turn"}
        </button>
      )}
    </div>
  );
});
