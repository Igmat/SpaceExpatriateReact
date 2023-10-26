import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { CardDefinition, CardType } from "../card-types";
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
    private readonly modal: ModalManager,
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
      return this.tryNext() //заглушка
    }
    if (this.militaryOption === "exploration") {
      this.round.startPerformingStep();
      this.remaining.activateDeck++;
    }
  };

  tryNext = () => this.remaining.activateDeck === 0;

  activateDeck = (type: CardType) => {
    if (
      this.round.step === "performing" &&
      this.militaryOption === "exploration"
    )
      this.hand.takeCard(this.decks[type].takeCard());
    this.remaining.activateDeck = 0;
   return this.tryNext()
  };

  activateCard = (card: number) => {};
  activateColonyCard = (card: number) => {};
  activateCardOnTable = async (card: CardDefinition) => {
    return false;
  };

  reset = () => {};

  isDisabled(place: string, card: CardDefinition, ): boolean {
    if (this.round.phase === "military") {
      if (place === "table") return true;
      if (place === "hand") return true;
      if (place === "opened") return true;
    }
    return false;
  }

  isDisabledDeck = (type: CardType): boolean => {
    return false;
  };

}
