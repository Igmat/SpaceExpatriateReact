import styles from "./styles.module.scss";
import { GameState } from "../../Rules";
import { observer } from "mobx-react-lite";

export const Rest = observer(() => {

  return (
    <div className={styles.container}>
      <p>In rest: {GameState.decks.dropLength}</p>
    </div>
  );
});
