import React from 'react';
import { Board } from '../Board';
import { Player } from '../Player';
import { Enemy } from '../Enemy';
import './App.css';

function App() {
  return (
    <div className="App">
      <Board />
      <Player />
      <Enemy />
    </div>
  );
}

export default App;
