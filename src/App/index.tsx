import React from "react";
import { Board } from "../Board";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import "./App.css";
import { Rest } from "../components/Rest";

function App() {
  return (
    <div className="App">
      <div className="board">
        {" "}
        <Board />
      </div>
      <div className="player">
        {" "}
        <Player />
      </div>

      {/*  <Rest/>*/}

      {/*<Enemy />*/}
    </div>
  );
}

export default App;
