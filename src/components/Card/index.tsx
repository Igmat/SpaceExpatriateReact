import styles from "./Card.module.scss";
import { CardDefinition, GeneralCard } from "../../Rules/card-types";
import { ResourceComponent } from "../ResourceComponent";
import { observer } from "mobx-react-lite";
import { ActionManager } from "../../Rules/ActionManager";

type CardProps = GeneralCard & {
  onClick?: () => void;
  action: ActionManager;
  
}; 
//проверка на активность карты делать тут
export const Card = observer((props: CardProps) => {
  return (
    <div
      className={`${styles[props.type]} ${styles.card} ${props.action.isDisabled(props) ? styles.disabled : ""} `}
      onClick={props.onClick}
    > <div>{"ID: " + props.id}</div>
      {props.type === "delivery" &&
        props.resources.map((el, ind) => (
          <ResourceComponent key={ind} type={el} />
        ))}
      {props.type === "engineering" && (
        <div className={styles[props.connection]}>
          <div>{props.connection}</div>
          <div className={styles.entryPoint}>
            {props.entryPoint && <ResourceComponent type={props.entryPoint} />}
          </div>
          <div className={styles.exitPoint}>
            {props.exitPoint &&
              props.exitPoint.map((el, ind) => (
                <ResourceComponent key={ind} type={el} />
              ))}
            {props.points && <div>{props.points}</div>}
          </div>
        </div>
      )}
      {props.type === "military" && (
        <div className={styles[props.weapon]}>{props.name}</div>
      )}
      {props.type === "terraforming" && (
        <div className={ styles.infoWrapper}>
          <div className={styles.resourceWrapper}>
                {props.resources.map((el, ind) => (
              <ResourceComponent key={ind} type={el} />
            ))}
        
          </div>
       
          <div className={styles.points}>{props.points}</div>
          <p className={styles.cardName}>{props.name}</p>
        </div>
      )}
    </div>
  );
})
