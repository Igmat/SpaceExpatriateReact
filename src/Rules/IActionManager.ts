import { GeneralCard, CardType } from "./card-types";

export interface IActionManager {
  perform: (card: GeneralCard) => void;
  confirm: () => void;
  activateDeck: (type: CardType) => void;
  activateCard: (card: number) => void;
  activateCardOnTable: (card: GeneralCard) => Promise<boolean>;
  reset: () => void;
  get isEnded(): boolean;
}
