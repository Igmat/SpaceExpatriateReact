import { CardDefinition, CardType } from "./card-types";

export interface IActionManager {
    perform: (card: CardDefinition) => void
    tryNext: () => boolean
    activateDeck: (type: CardType) => void
    activateCard: (card: number) => void
    activateCardOnTable: (card: CardDefinition) => boolean
    select: (option: string) => void
    reset: () => void
}
// нужно обновить
