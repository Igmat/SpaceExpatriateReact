import styles from "./Card.module.scss";
import { CardDefinition, GeneralCard } from "../../Rules/card-types";
import { ResourceComponent } from "../ResourceComponent";
import { observer } from "mobx-react-lite";
import { ActionManager } from "../../Rules/ActionManager";

export type CardProps = {
  onClick?: () => void;
  isSelected?: boolean;
  action: ActionManager;
  model: GeneralCard
}; 
//проверка на активность карты делать тут
export const Card = observer((props: CardProps) => {
  return (
    <div
    //className={`${styles[props.model.type]} ${styles.card} ${props.action.isDisabled(props.model) ? styles.disabled : ""}  ${props.isSelected ? styles.selected : ""}`}
    
    className={`${styles[props.model.type]} ${styles.card} ${props.isSelected ? styles.selected : ""}`}
      onClick={props.onClick}
    > <div>{"ID: " + props.model.id}</div>
      {props.model.type === "delivery" &&
        props.model.resources.map((el, ind) => (
          <ResourceComponent key={ind} type={el} />
        ))}
      {props.model.type === "engineering" && (
        <div className={styles[props.model.connection]}>
          <div>{props.model.connection}</div>
          <div className={styles.entryPoint}>
            {props.model.entryPoint && <ResourceComponent type={props.model.entryPoint} />}
          </div>
          <div className={styles.exitPoint}>
            {props.model.exitPoint &&
              props.model.exitPoint.map((el, ind) => (
                <ResourceComponent key={ind} type={el} />
              ))}
            {props.model.points && <div>{props.model.points}</div>}
          </div>
        </div>
      )}
      {props.model.type === "military" && (
        <div className={styles[props.model.weapon]}>{props.model.name}</div>
      )}
      {props.model.type === "terraforming" && (
        <div className={ styles.infoWrapper}>
          <div className={styles.resourceWrapper}>
                {props.model.resources.map((el, ind) => (
              <ResourceComponent key={ind} type={el} />
            ))}
        
          </div>
       
          <div className={styles.points}>{props.model.points}</div>
          <p className={styles.cardName}>{props.model.name}</p>
        </div>
      )}
    </div>
  );
})
