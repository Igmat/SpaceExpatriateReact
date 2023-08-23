import styles from "./styles.module.scss";
import { GameState } from "../../Rules";
import { observer } from "mobx-react-lite";

export const Rest = observer(() => {
  const state = Object.keys(GameState); //.map(el => el.slice(0, -4))
  return (
    <div className={styles.container}>
      <p>In rest: {state.reduce((acc, el) => acc + GameState[el].restCount, 0)}</p>
    </div>
  );
});
