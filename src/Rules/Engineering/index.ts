import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

export class ActionManager implements IActionManager {
    constructor(
        private readonly round: RoundManager,
        private readonly table: TableModel,
        private readonly decks: DeckManager,
        private readonly hand: HandModel,
        gameId: string
    ) {
        makeAutoObservable(this);
        makeAutoSavable(this, gameId, "engineeringManager",[
            "_remaining" as any
          ]);
    }

    private _remaining = { 
        activateDeck: 0,
        activateCard: 0,
    };

    perform = (card: CardDefinition) => {
        this._remaining.activateDeck = 1;
        this._remaining.activateCard = this.hand.cardsInHand.length > 0 ? 1 : 0;
        this.round.startPerformingStep();
    };

    tryNext = () =>
        this._remaining.activateDeck === 0
        && this._remaining.activateCard === 0;

    activateDeck = (type: CardType) => {
        if (this._remaining.activateDeck === 0) return;
        this._remaining.activateDeck--;
        this.table.takeCard(this.decks[type].takeCard());
        this.tryNext() && this.round.next()
    };
    activateCard = (card: number) => {
        if (this._remaining.activateCard === 0) return;
        this._remaining.activateCard--;
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