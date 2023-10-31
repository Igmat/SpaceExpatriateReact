import { CardDefinition, CardType } from "./card-types";

export interface IActionManager {
  perform: (card: CardDefinition) => Promise<void>;
  confirm: () => Promise<void>;
  activateDeck: (type: CardType) => void;
  activateCard: (card: number) => void;
  activateCardOnTable: (card: CardDefinition) => Promise<boolean>;
  reset: () => Promise<void>;
  get isEnded(): boolean;
}
