import { CardDefinition } from "../card-types";
import { Hand } from "./Hand";
import { Table } from "./Table";

export const Player = () => {

    const cards: CardDefinition[] = [
        { type: "delivery", resources: ["fuel"] },
        { type: "engineering", connection: "start", exitPoint: ["dark matter"] },
        { type: "military", weapon: "intelligence" },
        { type: "terraforming", points: 1, resources: ["minerals", "nanotechnologies"] }
    ];

    return (
        <div>
            <Table />
            <Hand cards={cards} />
        </div>
    )
}