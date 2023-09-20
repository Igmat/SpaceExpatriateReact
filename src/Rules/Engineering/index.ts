import { autorun, makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { writeToLS, readFromLS } from "../../utils";
export class ActionManager implements IActionManager {
    constructor(
        private readonly round: RoundManager,
        private readonly table: TableModel,
        private readonly decks: DeckManager,
        private readonly hand: HandModel,
    ) {
        makeAutoObservable(this);
        autorun(() => {
            writeToLS("remaining", this.remaining);
          });
    }

    private remaining =  readFromLS ("remaining") || {
        activateDeck: 0,
        activateCard: 0,
    };

    perform = (card: CardDefinition) => {
        this.remaining.activateDeck = 1;
        this.remaining.activateCard = 1;
        this.round.startPerformingStep();
    };

    tryNext = () =>
        this.remaining.activateDeck === 0
        && this.remaining.activateCard === 0;

    activateDeck = (type: CardType) => {
        if (this.remaining.activateDeck === 0) return;
        this.remaining.activateDeck--;
        this.table.takeCard(this.decks[type].takeCard());
        this.tryNext() && this.round.next()
    };
    activateCard = (card: number) => {
        if (this.remaining.activateCard === 0) return;
        this.remaining.activateCard--;
        this.table.takeCard(this.hand.dropCard(card));
        this.tryNext() && this.round.next()
    };
    activateCardOnTable = (card: CardDefinition) => 
        false;

    select = (option: string) => {

    }

    reset = () => {
        
    }
}