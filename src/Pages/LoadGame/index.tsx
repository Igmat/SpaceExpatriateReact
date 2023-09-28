import React from "react";
import { gameStore } from "../../Store";
import { observer } from "mobx-react-lite";
import styles from "./LoadGame.module.scss";

export const LoadGame = observer(() => {
  const { savedGameIds } = gameStore;

  return (
    <div className={styles.wrapper}>
      <h1>Load Your Game</h1>
      <ul className={styles.ul}>
        {savedGameIds.map((gameId, index) => (
          <li key={index} className={styles.li}><a href={`/game/${gameId}`}>
            {gameId}</a>
            <button className={styles.smallbutton} onClick={() => gameStore.deleteSavedGameId(gameId)}>
              X
            </button>
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={() => gameStore.deleteAllSavedGameIds()}>Delete All Games</button>
    </div>
  );
});
