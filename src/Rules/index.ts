
import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";

export const GameState = {
    
    hand: new HandModel(),
    decks: new DeckManager()
    
};

