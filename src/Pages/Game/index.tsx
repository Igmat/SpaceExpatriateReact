
import { Board } from "../../Board";
import { Player } from "../../Player";
import { useModalWrapper } from "../../components/ModalWindow";
import { ControlPanel } from "../../ControlPanel";
import { useParams } from "react-router-dom";

export const Game = () => {
 const gameId = useParams<{gameId: string}>().gameId;

 return useModalWrapper((
    <div className="App">
      <Provider value={new GameState(gameId)}>
      <div className="board">
        <Board />
      </div>
      <div className="player">
        <Player />
      </div>
      <ControlPanel/>
      </Provider>
    </div>
  ));
}

