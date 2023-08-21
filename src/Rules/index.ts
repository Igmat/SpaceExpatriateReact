import { DeckModel } from "./DeckModel";
import { deliveryCards } from "./CardDefinitions/delivery";
import { militaryCards } from "./CardDefinitions/military";
import { engineeringCards } from "./CardDefinitions/engineering";

export const GameState = {
    deliveryDeck: new DeckModel(deliveryCards),
    engineeringDeck: new DeckModel(engineeringCards),
    terraformingDeck: new DeckModel({}),
    militaryDeck: new DeckModel(militaryCards),
};

