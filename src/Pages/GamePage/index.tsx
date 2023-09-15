
import { Board } from "../../Board";
import { Player } from "../../Player";
import { useModalWrapper } from "../../components/ModalWindow";
import { ControlPanel } from "../../ControlPanel";

export const GamePage = () => {
 return useModalWrapper((
    <div className="App">
      <div className="board">
        <Board />
      </div>
      <div className="player">
        <Player />
      </div>
      <ControlPanel/>
    </div>
  ));
}

