import { Deck } from "./Deck";
import styles from "./Board.module.scss";
import { gameState } from "../Rules";
import { ResursesDeck } from "./ResursesDeck";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";


export const Board = observer(() => {
  const [propmt, setPropmt] = useState("");


  useEffect(() => {
    gameState.round.current >= 5 && setPropmt(`Choose a mission, round ${gameState.round.current}`);
    setTimeout(() => setPropmt(" "), 2000);
  }, [gameState.round.current]);

  return (
    <div className={styles.container}>
      <ResursesDeck
        round={gameState.round}
        action={gameState.action}
        resources={gameState.resources}
      />
      <p> {propmt} </p>


      <div className={styles.board}>
        <Deck
          model={gameState.decks.delivery}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
        />
        <Deck
          model={gameState.decks.engineering}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
        />
        <Deck
          model={gameState.decks.terraforming}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
        />
        <Deck
          model={gameState.decks.military}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
        />
      </div>
    </div>
  );
});
