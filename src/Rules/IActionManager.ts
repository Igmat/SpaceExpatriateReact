import { CardDefinition, CardType, ColonyCard } from "./card-types";

export interface IActionManager {
    perform: (card: Exclude<CardDefinition, ColonyCard>) => void
    tryNext: () => boolean
    activateDeck: (type: CardType) => void
    activateCard: (card: number) => void
    activateCardOnTable: (card: Exclude<CardDefinition, ColonyCard>) => boolean
    select: (option: string) => void
    reset: () => void
}

