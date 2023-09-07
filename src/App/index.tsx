import { Board } from "../Board";
import { Player } from "../Player";
import "./App.css";
import { useModalWrapper } from "../components/ModalWindow";
import { ControlPanel } from "../ControlPanel";

function App() {
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

export default App;
