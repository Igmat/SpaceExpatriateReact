import { DeckModel } from "./DeckModel";
import { deliveryCards } from "./CardDefinitions/delivery";
import { militaryCards } from "./CardDefinitions/military";
import { engineeringCards } from "./CardDefinitions/engineering";
import { terraformingCards } from "./CardDefinitions/terraforming"; 
import { PlayerModel } from "./PlayerModel";

export const GameState = {
    deliveryDeck: new DeckModel('delivery', deliveryCards),
    engineeringDeck: new DeckModel('engineering', engineeringCards),
    terraformingDeck: new DeckModel('terraforming', terraformingCards),
    militaryDeck: new DeckModel('military', militaryCards),
};

export const PlayerState = {
    cards: new PlayerModel()

}