import { makeAutoObservable } from "mobx";
import { ColonyDeckModel } from "./ColonyDeckModel";
import { colonyCards } from "./colony-cards";
import { RoundManager } from "../RoundManager";

interface notTakenColonyCard {
    id: number;
    points: number;
}

export class ColonyManager {
    constructor(
        private readonly gameId: string,
        private readonly round: RoundManager
    ) {
        makeAutoObservable(this);
        this.initialize();
    }

    colonyDeck = new ColonyDeckModel(colonyCards, this.gameId)
    currentRound: number = 0;
    notTakenColonyCards: notTakenColonyCard[] = [];

    initialize = () => {
        this.currentRound = this.round.current;
    }

    // open new Card from the deck if round is new
    openNewCardAfterRound = () => {
        if (this.round.phase) {
            const callCount = 3 - this.colonyDeck.openedCards.length;
            for (let i = 0; i < callCount; i++) {
                this.colonyDeck.openCard();
            }
            this.currentRound = this.round.current;
        }
    }

    // get points from colony cards if they are was not taken after round
    getColonyPoints = () => {

    }

    // reset colony cards when button "reset" is clicked
    reset = () => {

    }


}