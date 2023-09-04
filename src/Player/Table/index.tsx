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
      <div className={styles.cardsContainer}>
        {props.model.delivery.map((card, ind) => (
          <Card key={ind} {...card} onClick={()=>props.action.chooseCardsToDrop(card)}/>
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.engineering.map((card, ind) => (
          <Card key={ind} {...card} onClick={()=>props.action.chooseCardsToDrop(card)}/>
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.terraforming.map((card, ind) => (
          <Card key={ind} {...card} onClick={()=>props.action.chooseCardsToDrop(card)}/>
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.military.map((card, ind) => (
          <Card key={ind} {...card} onClick={()=>props.action.chooseCardsToDrop(card)}/>
        ))}
      </div>
      {props.round.step === "performing" && props.action.cardsToDrop.length > 0 && <button className={styles.resetButton} onClick={props.action.reset}>Reset</button>}
      {props.round.step === "performing" && props.action.cardsToDrop.length === 4 && <button className={styles.confirmButton} onClick={props.action.dropCards}>Confirm</button>}
      {props.round.step === "performing" && <button className={styles.giveUpButton} onClick={props.action.endAction}>Give up</button>}
    </div>
  );
});
