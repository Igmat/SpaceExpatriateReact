import styles from "./Table.module.scss";
import { TableModel } from "../../Rules/TableModel";
import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card";
import { ActionManager } from "../../Rules/ActionManager";
import { RoundManager } from "../../Rules/RoundManager";
import { ResourcesModel } from "../../Rules/ResourcesModel";


interface TableProps {
  model: TableModel;
  round: RoundManager;
  action: ActionManager;
  resources: ResourcesModel;
}

export const Table = observer((props: TableProps) => {
  const endTheRound = () => {
     props.action.dropResources();
  };




  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {props.model.delivery.map((card, ind) => (
          <Card key={ind} {...card} 
          isSelected={props.action.cardsToDrop.includes(card)} 
          onClick={()=>props.action.activateCardsOnTable(card)}
          />
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.engineering.map((card, ind) => (
          <Card
            key={ind}
            {...card}
            isSelected={props.action.cardsToDrop.includes(card)} 
            isAvailable = {props.round.phase === 'delivery' && props.round.step === 'performing'}
            onClick={() => props.action.activateCardsOnTable(card)}
          />
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.terraforming.map((card, ind) => (
          <Card
            key={ind}
            {...card}
            isSelected={props.action.cardsToDrop.includes(card)} 
            isAvailable = {props.round.phase === 'delivery' && props.round.step === 'performing'}
            onClick={() => props.action.activateCardsOnTable(card)}
          />
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.military.map((card, ind) => (
          <Card key={ind} {...card} 
          isSelected={props.action.cardsToDrop.includes(card)} 
          onClick={()=>props.action.activateCardsOnTable(card)}
          />
        ))}
      </div>
      {props.round?.step === "performing" && (
        <div className={styles.end} onClick={() => endTheRound()}>
          End the round
        </div>
      )}
      <div className={styles.round}>{"Round: " + props.round.current}</div>
  {  /*  {(["delivery", "engineering", "terraforming", "military"] as const).map(el => 
        <div className={styles.cardsContainer}>
        {props.model[el].map((card, ind) => (
          <Card key={ind} {...card} 
          {}
          isSelected={props.action.cardsToDrop.includes(card)}
           onClick={()=>props.action.activateCardsOnTable(card)}/>
        ))}
      </div>
      )}*/}

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
