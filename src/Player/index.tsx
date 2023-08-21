import { CardDefinition } from '../Rules/card-types';
import { Hand } from "./Hand";
import { Table } from "./Table";

export const Player = () => {

    const cards: CardDefinition[] = [
        { id: 1, type: "delivery", resources: ["fuel"] },
        { id: 2, type: "engineering", connection: "start", exitPoint: ["dark matter"] },
        { id: 2, type: "military", weapon: "intelligence" },
        { id: 1, type: "terraforming", points: 1, resources: ["minerals", "nanotechnologies"] }
    ];

    return (
        <div>
            <Table />
            <Hand cards={cards} />
        </div>
    )
}