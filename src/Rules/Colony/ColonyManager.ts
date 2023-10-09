import { makeAutoObservable } from "mobx";
import { ColonyDeckModel } from "./ColonyDeckModel";
import { colonyCards } from "./colony-cards";

interface notTakenColonyCard {
    id: number;
    points: number;
}

export class ColonyManager {
    constructor(
        private readonly gameId: string,
    ) {
        makeAutoObservable(this);
        this.initialize();
    }

    colonyDeck = new ColonyDeckModel(colonyCards, this.gameId)
    currentRound: number = 0;
    notTakenColonyCards: notTakenColonyCard[] = [];

    initialize = () => {

    }


    // get points from colony cards if they are was not taken after round
    getColonyPoints = () => {

    }

    // reset colony cards when button "reset" is clicked
    reset = () => {

    }


}