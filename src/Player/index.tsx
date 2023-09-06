
import { gameState } from "../Rules";
import { Hand } from "./Hand";
import { Table } from "./Table";
import { observer } from "mobx-react-lite";

export const Player = observer(() => {
  return (
    <>
      <Table model={gameState.table} action={gameState.action} round={gameState.round} />
      <Hand model={gameState.hand} decks={gameState.decks} action={gameState.action}/>
    </>
  );
});
