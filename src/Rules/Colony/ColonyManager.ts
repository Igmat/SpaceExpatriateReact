import { makeAutoObservable } from "mobx";
import { ColonyDeckModel } from "./ColonyDeckModel";
import { colonyCards } from "./colony-cards";

export class ColonyManager {
    constructor(
        private readonly gameId: string,
    ) {
        makeAutoObservable(this);
    }

    colonyDeck = new ColonyDeckModel(colonyCards, this.gameId)

    getPoints = () => {
        return 0;
    }
}