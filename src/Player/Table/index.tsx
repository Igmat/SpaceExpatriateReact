import styles from "./Table.module.scss";
import { TableModel } from "../../Rules/TableModel";
import { observer } from "mobx-react-lite";
import { Card } from "../../components/Card";

interface TableProps {
  model: TableModel;
}

export const Table = observer((props: TableProps) => {

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {props.model.delivery.map((card, ind) => (
          <Card key={ind} {...card} />
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.engineering.map((card, ind) => (
          <Card key={ind} {...card} />
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.terraforming.map((card, ind) => (
          <Card key={ind} {...card} />
        ))}
      </div>
      <div className={styles.cardsContainer}>
        {props.model.military.map((card, ind) => (
          <Card key={ind} {...card} />
        ))}
      </div>
    </div>
  );
});
