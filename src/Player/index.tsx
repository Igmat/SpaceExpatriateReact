import { CardDefinition } from "../Rules/card-types";
import { Hand } from "./Hand";
import { Table } from "./Table";
import { GameState, PlayerState } from "../Rules";
import { DeckModel } from "../Rules/DeckModel";

export const Player = () => {
  return (
    <div>
      <Table />
      <Hand player={PlayerState.cards} state={GameState}/>
   
    </div>
  );
};
