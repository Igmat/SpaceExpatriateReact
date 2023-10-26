import { CardDefinition, CardType } from "./card-types";

export interface IActionManager {
  perform: (card: CardDefinition) => void;
  confirm: () => void;
  activateDeck: (type: CardType) => void;
  activateCard: (card: number) => void;
  activateCardOnTable: (card: CardDefinition) => Promise<boolean>;
  reset: () => void;
  get isEnded(): boolean;
}
