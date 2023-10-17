import { Deck } from "./Deck";
import styles from "./Board.module.scss";
import { useGameState } from "../Rules";
import { observer } from "mobx-react-lite";
import { ResourcesDeck } from "./ResourcesDeck";
import { ColonyDeck } from "./ColonyDeck";

export const Board = observer(() => {
  const gameState = useGameState();

  return (
    <div className={styles.container}>
      <ResourcesDeck
        round={gameState.round}
        action={gameState.action}
        resources={gameState.resources}
      />
      <div className={styles.colonyContainer}>
        <ColonyDeck colony={gameState.colonyDeck}
          table = {gameState.table}
          action={gameState.action}
         />
      </div>
      <div className={styles.board}>
        <Deck
          model={gameState.decks.delivery}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
          isDisabledDeck={gameState.action.isDisabledDeck("delivery")}
        />
        <Deck
          model={gameState.decks.engineering}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
          isDisabledDeck={gameState.action.isDisabledDeck("engineering")}
        />
        <Deck
          model={gameState.decks.terraforming}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
          isDisabledDeck={gameState.action.isDisabledDeck("terraforming")}
        />
        <Deck
          model={gameState.decks.military}
          hand={gameState.hand}
          resources={gameState.resources}
          table={gameState.table}
          action={gameState.action}
          round={gameState.round}
          isDisabledDeck={gameState.action.isDisabledDeck("military")}
        />
      </div>
    </div>
  );
});
