import { CardDefinition, CardType } from "./card-types";

export interface IActionManager {
    perform: (card: CardDefinition) => void

    activateDeck: (type: CardType) => void
    activateCard: (card: number) => void
    activateCardOnTable: (card: CardDefinition) => boolean
    select: (option: string) => void
    reset: () => void
    get isEnded(): boolean 
}

