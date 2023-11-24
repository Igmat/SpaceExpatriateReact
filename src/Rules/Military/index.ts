import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType, GeneralCard } from "../card-types";
import { RoundManager } from "../RoundManager";
import { HandModel } from "../HandModel";
import { DeckManager } from "../DeckManager";
import { ModalManager } from "../ModalManager";

export const MilitaryOptions = ["exploration", "political"] as const;
export type Militaryoption = (typeof MilitaryOptions)[number];

export class ActionManager implements IActionManager {
  constructor(
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly decks: DeckManager,
    private readonly modal: ModalManager
  ) {
    makeAutoObservable(this);
  }
  militaryOption?: Militaryoption;

  private remaining = {
    activateDeck: 0,
  };

  perform = async (card: CardDefinition) => {
    this.militaryOption = await this.modal.show("military", MilitaryOptions);

    if (this.militaryOption === "political") {
      // return this.tryNext() //заглушка
    }
    if (this.militaryOption === "exploration") {
      this.round.startPerformingStep();
      this.remaining.activateDeck++;
    }
  };
  confirm = async () => {};

  get isEnded() {
    return this.remaining.activateDeck === 0;
  }

  activateDeck = async (type: CardType) => {
    if (
      this.round.step === "performing" &&
      this.militaryOption === "exploration"
    )
    this.decks[type].topCard.move(this.hand.cardsInHand);
    this.remaining.activateDeck = 0;
  };

  activateCard = async (card: GeneralCard) => {};
  activateColonyCard = async (card: number) => {};
  activateCardOnTable = async (card: CardDefinition) => {
    return false;
  };

  reset = async () => {};

  isDisabled = (card: GeneralCard): boolean => true;

  isDisabledDeck = (type: CardType): boolean => false;
}
