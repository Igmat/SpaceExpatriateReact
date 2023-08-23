import styles from "./Card.module.scss";
import { CardDefinition } from "../../Rules/card-types";
import { ResourceComponent } from "../ResourceComponent";

type CardProps = CardDefinition & {}; // & {}- передаем действия игрока


export const Card = (props: CardProps) => {
  return (
    <div className={`${styles[props.type]} ${styles.card}`}>
      {props.type === "delivery" &&
        props.resources.map((el, ind) => (
          <ResourceComponent  key={props.type + ind} type={el} />
        ))}
      {props.type === "engineering" && (
        <div className={styles[props.connection]}>
          <div className={styles.entryPoint}>
            {props.entryPoint && (
              <ResourceComponent  key={1} type={props.entryPoint} />
            )}
          </div>
          <div className={styles.exitPoint}>
            {props.exitPoint &&
              props.exitPoint.map((el) => (
                <ResourceComponent key={2} type={el} />
              ))}
            {props.points && <div>{props.points}</div>}
          </div>
        </div>
      )}
      {props.type === "military" && (
        <div className={styles[props.weapon]}></div>
      )}
      {props.type === "terraforming" && (
        <>
          <div>
            {props.resources.map((el, ind) => (
              <ResourceComponent  key={props.type + ind} type={el} />
            ))}
          </div>
          <div>{props.points}</div>
        </>
      )}
    </div>
  );
};
