import { Board } from "../../Board";
import { Player } from "../../Player";
import { useModalWrapper } from "../../components/ModalWindow";
import { ControlPanel } from "../../ControlPanel";
import { useParams } from "react-router-dom";
import { Provider, GameState } from "../../Rules";
import { useMemo} from "react";
import { gameStore } from "../../Store";
import { NavLink } from "react-router-dom";
import styles from './Game.module.scss'

export const Game = () => {
  const gameId = useParams<{ gameId: string }>().gameId;
  const gameState = useMemo(() => new GameState(gameId), [gameId]);

  const saveGame = (gameId:string) => {
    gameStore.addSavedGameId(gameId);
  };
  
 
  return (
    <Provider value={gameState}>
      {useModalWrapper(
        <div className="App">
          <div className="board">
            <div className={styles.gameBtns}>
            <button onClick={() => saveGame(gameId!)}>Save Game</button>
          <NavLink to="/"> <button className={styles.startBtn}>End Game</button></NavLink>
            </div>
      
            <Board />
          </div>
          <div className="player">
            <Player />
          </div>
          <ControlPanel />
        </div>
      )}
    </Provider>
  );
};
