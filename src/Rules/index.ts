import { DeckModel } from "./DeckModel";
import { deliveryCards } from "./CardDefinitions/delivery";
import { militaryCards } from "./CardDefinitions/military";

export const GameState = {
    deliveryDeck: new DeckModel(deliveryCards),
    engineeringDeck: new DeckModel({}),
    terraformingDeck: new DeckModel({}),
    militaryDeck: new DeckModel(militaryCards),
};

