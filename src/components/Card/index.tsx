import styles from "./Card.module.scss";
import { CardDefinition } from "../../Rules/card-types";
import { ResourceComponent } from "../ResourceComponent";

type CardProps = CardDefinition & {
  onClick?: () => void;
}; // & {}- передаем действия игрока

export const Card = (props: CardProps) => {
  return (
    <div
      className={`${styles[props.type]} ${styles.card}`}
      onClick={props.onClick}
    >
      {props.type === "delivery" &&
        props.resources.map((el, ind) => <ResourceComponent key={ind} type={el} />)}
      {props.type === "engineering" && (
        <div className={styles[props.connection]}>
          <div className={styles.entryPoint}>
            {props.entryPoint && <ResourceComponent type={props.entryPoint} />}
          </div>
          <div className={styles.exitPoint}>
            {props.exitPoint &&
              props.exitPoint.map((el, ind) => <ResourceComponent key={ind} type={el} />)}
            {props.points && <div>{props.points}</div>}
          </div>
        </div>
      )}
      {props.type === "military" && (
        <div className={styles[props.weapon]}>{props.name}</div>
      )}
      {props.type === "terraforming" && (
        <>
          <div>
            {/*props.resources.map(el => <div className={styles[el]}></div>)*/}
            {props.resources.map((el, ind) => (
              <ResourceComponent key={ind}  type={el} />
            ))}
          </div>
          <div>{props.points}</div>
        </>
      )}
    </div>
  );
};
