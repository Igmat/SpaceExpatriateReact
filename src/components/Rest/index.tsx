import styles from "./styles.module.scss";
import { gameState } from "../../Rules";
import { observer } from "mobx-react-lite";

export const Rest = observer(() => {

  return (
    <div className={styles.container}>
      <p>In rest: {gameState.decks.dropLength}</p>
    </div>
  );
});
