import styles from "./Table.module.scss";
import { TableModel } from "../../Rules/TableModel";
import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card";
import { ActionManager } from "../../Rules/ActionManager";
import { RoundManager } from "../../Rules/RoundManager";

interface TableProps {
  model: TableModel;
  action: ActionManager;
  round: RoundManager
}

export const Table = observer((props: TableProps) => {

  return (
    <div className={styles.container}>
      {(["delivery", "engineering", "terraforming", "military"] as const).map(el => 
        <div className={styles.cardsContainer}>
        {props.model[el].map((card, ind) => (
          <Card key={ind} {...card} isSelected={props.action.cardsToDrop.includes(card)} onClick={()=>props.action.activateCardsOnTable(card)}/>
        ))}
      </div>
      )}

      {/*buttons*/}
      {props.round.step === "performing"
        && props.action.cardsToDrop.length > 0
        && <button className={styles.resetButton} onClick={props.action.reset}>Reset</button>}
      {props.round.step === "performing"
        && props.action.cardsToDrop.length >= 3
        && <button className={styles.confirmButton} onClick={props.action.tryBuildColony}>Confirm</button>}
      {props.round.step === "performing"
        && <button className={styles.giveUpButton} onClick={props.action.endAction}>End my turn</button>}
    </div>
  );
});
