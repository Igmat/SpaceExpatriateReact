import { ColonyCard } from "../../Rules/card-types";
import styles from "./colonyCard.module.scss";
import { observer } from "mobx-react-lite";

type CardProps = ColonyCard & {
  onClick?: () => void;
};
/*

export const CCard = observer((props: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.mutateAction}>{props.mutateAction}</div>
      <div className={styles.benefit}>{props.benefit}</div>
      <p className={styles.points}>2</p>
      <p className={styles.colony}>COLONY</p>
      <p className={styles.name}>{props.name}</p>
    </div>
  );
});
*/

export const CCard = observer(() => {
    return (
      <div className={styles.card}>
        <div className={styles.mutateAction}>terraforming</div>
        <div className={styles.benefit}>Rerum voluptatum optio voluptatem a quae saepe. Cumque quibusdam placeat corporis.</div>
        <p className={styles.points}>2</p>
        <p className={styles.colony}>COLONY</p>
        <p className={styles.name}>tra la la la la la</p>
      </div>
    );
  });