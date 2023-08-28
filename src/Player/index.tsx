
import { gameState } from "../Rules";
import { Hand } from "./Hand";
import { Table } from "./Table";
import { observer } from "mobx-react-lite";

export const Player = observer(() => {
  return (
    <>
      <Table model={gameState.table} />
      <Hand model={gameState.hand} decks={gameState.decks} action={gameState.action}/>
    </>
  );
});
