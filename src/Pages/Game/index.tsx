import { Board } from "../../Board";
import { Player } from "../../Player";
import { useModalWrapper } from "../../components/ModalWindow";
import { ControlPanel } from "../../ControlPanel";
import { useParams } from "react-router-dom";
import { Provider, GameState } from "../../Rules";
import { useMemo } from "react";

export const Game = () => {
  const gameId = useParams<{ gameId: string }>().gameId;
  const gameState = useMemo(() => new GameState(gameId), [gameId]);

  return (
    <Provider value={gameState}>
      {useModalWrapper(
        <div className="App">
          <div className="board">
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
