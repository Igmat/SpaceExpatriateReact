import { Board } from "../../Board";
import { Player } from "../../Player";
import { useModalWrapper } from "../../components/ModalWindow";
import { ControlPanel } from "../../ControlPanel";
import { useParams } from "react-router-dom";
import { Provider, GameState } from "../../Rules";
import { useMemo} from "react";
import { gameStore } from "../../Store";



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
          <button onClick={() => saveGame(gameId!)}>Save Game</button>
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
