import { ColonyCard } from "../../Rules/card-types";
import styles from "./colonyCard.module.scss";
import { observer } from "mobx-react-lite";

type CardProps = ColonyCard & {
  onOpenCardClick?: () => void;
};

export const CCard = observer((props: CardProps) => {

  return (
    <div className={styles.card} onClick={props.onOpenCardClick}>
      <div className={styles.mutateAction}>{props.mutateAction}</div>
      <div className={styles.benefit}>{props.benefit}</div>
      <p className={styles.points}>2</p>
      <p className={styles.colony}>COLONY</p>
      <p className={styles.name}>{props.name}</p>
    </div>
  );
});