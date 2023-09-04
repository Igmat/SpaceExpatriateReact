import React, { createContext, useState, useMemo } from "react";
import { Board } from "../Board";
import { Player } from "../Player";
import { Enemy } from "../Enemy";
import "./App.css";
import { Rest } from "../components/Rest";
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
/*
Сделать три модалки (на каждую карту)

*/