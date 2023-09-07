import styles from "./Card.module.scss";
import { CardDefinition } from "../../Rules/card-types";
import { ResourceComponent } from "../ResourceComponent";
import { observer } from "mobx-react-lite";

type CardProps = CardDefinition & {
  onClick?: () => void;
  isAvailable?: boolean;
  isSelected?: boolean;
}; // & {}- передаем действия игрока

export const Card = observer((props: CardProps) => {
  return (
    <div
      className={`${styles[props.type]} ${styles.card} ${props.isAvailable ? styles.deliveryPerforming : ""}  ${props.isSelected ? styles.selected : ""}`}
      onClick={props.onClick}
    >
      {props.type === "delivery" &&
        props.resources.map((el, ind) => (
          <ResourceComponent key={ind} type={el} />
        ))}
      {props.type === "engineering" && (
        <div className={styles[props.connection]}>
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
