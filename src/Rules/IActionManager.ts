import { CardType, GeneralCard } from "./card-types";

export interface IActionManager {
  perform: (card: GeneralCard) => Promise<void>;
  confirm: () => Promise<void>;
  activateDeck: (type: CardType) => Promise<void>;
  activateCard: (card: GeneralCard) => Promise<void>;
  activateCardOnTable: (card: GeneralCard) => Promise<boolean>;
  reset: () => Promise<void>;
  get isEnded(): boolean;
}
