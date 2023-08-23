import React from 'react';
import { Board } from '../Board';
import { Player } from '../Player';
import { Enemy } from '../Enemy';
import './App.css';
import { Rest } from '../components/Rest';

function App() {
  return (
    <div className="App">
      <Board />
      <Rest/>
      <Player />
      <Enemy />
    </div>
  );
}

export default App;
