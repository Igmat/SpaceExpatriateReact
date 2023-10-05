import { CCard } from "../../components/ColonyCard";
import styles from "./ColonyDeck.module.scss";
import { observer } from "mobx-react-lite";

export const ColonyDeck = observer(() => {
  return (
    <div className={styles.colonyCards}>
      {/*props.colony.openedCard && (<CCard {...props.colony.openedCard}/>)*/}
      <CCard />
      <CCard />

      <CCard />
    </div>
  );
});
