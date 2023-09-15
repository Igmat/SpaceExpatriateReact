import { Board } from "../Board";
import { Player } from "../Player";
import "./App.css";
import { useModalWrapper } from "../components/ModalWindow";
import { ControlPanel } from "../ControlPanel";
import { Outlet } from "react-router-dom";

function App() {
  /*
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
  ));*/
 return <Outlet />



}

export default App;
