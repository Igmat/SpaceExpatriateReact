
import { gameState } from "../Rules";
import { Hand } from "./Hand";
import { PlayerMenu } from "./PlayerMenu";
import { Table } from "./Table";
import { observer } from "mobx-react-lite";

export const Player = observer(() => {
  return (
    <>
      <Table model={gameState.table} round={gameState.round} action={gameState.action} resources={gameState.resources}/>
      <Hand model={gameState.hand} decks={gameState.decks} action={gameState.action}/>
      <PlayerMenu action={gameState.action} resources={gameState.resources}/>
    </>
  );
});
