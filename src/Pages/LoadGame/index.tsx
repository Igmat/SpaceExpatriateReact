import React from "react";
import { gameStore } from "../../Store";
import { observer } from "mobx-react-lite";
import styles from "./LoadGame.module.scss";
import { NavLink } from "react-router-dom";

export const LoadGame = observer(() => {
  const { savedGameIds } = gameStore;

  return (
    <div className={styles.wrapper}>
      <h1>Load Your Game</h1>
      <ul className={styles.ul}>
        {savedGameIds.map((gameId, index) => (
          <li key={index} className={styles.li}><NavLink to={`/game/${gameId}`}>
            {gameId}</NavLink>
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
