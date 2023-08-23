import { CardDefinition } from '../Rules/card-types';
import { GameState } from '../Rules';
import { Hand } from "./Hand";
import { Table } from "./Table";
import { observer } from 'mobx-react-lite';

export const Player = observer(() => {

    return (
        <>
            <Table />
            <Hand model={GameState.hand} decks={GameState.decks}/>
        </>
    )
})
