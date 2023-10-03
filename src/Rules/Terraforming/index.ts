import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType, ColonyCard, isCardType } from "../card-types";
import { RoundManager } from "../RoundManager";
import { TableModel } from "../TableModel";
import { DeckManager } from "../DeckManager";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

export class ActionManager implements IActionManager {

    cardsToDrop: Exclude<CardDefinition, ColonyCard>[] = [];

    missionType?: CardType;

    constructor(
        private readonly round: RoundManager,
        private readonly table: TableModel,
        private readonly decks: DeckManager,
        gameId: string
    ) {
        makeAutoObservable(this);
        makeAutoSavable(this, gameId, "terraformingManager", [
            "cardsToDrop",
            "missionType"
        ]);
    }

    perform = (card: CardDefinition) => {
        this.round.startOptionsStep();
    };
    tryNext = () => {
        return true
        //tryBuildColony
        //должна быть очистка
    };
    activateDeck = (type: CardType) => {

    };
    activateCard = (card: number) => {

    };
    activateCardOnTable = (card: Exclude<CardDefinition, ColonyCard>) => {
        //проверка на наличие в массиве
        this.cardsToDrop.push(card)
        return true
    };

    select = (option: string) => {
        if (isCardType(option)) {
            this.round.startPerformingStep();
            this.missionType = option;
        }
    }

    reset = () => {
        this.cardsToDrop = [];
        console.log("cardsToDrop: " + this.cardsToDrop.length);
    }

    dropCards = () => {
        this.decks.dropCards(...this.table.dropCards(...this.cardsToDrop));
        this.cardsToDrop = [];
        console.log("You have dropped cards and got 1 Colony");
        this.tryNext();
    };


    tryBuildColony = () => {
        this.cardsToDrop.length === 3 &&
            this.cardsToDrop.filter((card) => card.type === this.missionType)
                .length === 3 &&
            this.dropCards();
        this.cardsToDrop.length === 4 &&
            (["delivery", "engineering", "terraforming", "military"] as const)
                .map(
                    (el) =>
                        this.cardsToDrop.filter((card) => card.type === el).length === 1
                )
                .filter(Boolean).length === 4 &&
            this.dropCards();
        //сделать возврат true / false
    };
}