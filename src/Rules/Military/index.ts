import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { HandModel } from "../HandModel";
import { DeckManager } from "../DeckManager";

export class ActionManager implements IActionManager {
    constructor(
        private readonly round: RoundManager,
        private readonly hand: HandModel,
        private readonly decks: DeckManager,
  ) {
    makeAutoObservable(this);
  }
    perform = (card: CardDefinition) => {
        this.round.step = "options";
    };

    tryNext = () => true;

    activateDeck = (type: CardType) => this.hand.takeCard(this.decks[type].takeCard());

    activateCard = (card: number) => {

    };
    activateCardOnTable = (card: CardDefinition) => {
        return false
    };

    select = (option: string) => {
        
    }

    reset = () => {

    }
}