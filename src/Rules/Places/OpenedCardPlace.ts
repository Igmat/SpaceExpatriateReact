import { makeAutoObservable } from "mobx";
import { CardType } from "../card-types";
import { BasicPlace } from ".";
import { BasicCard } from "../Cards";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

export class OpenedCardsPlace<T extends BasicCard> extends BasicPlace<T> {
  protected getCardInstance(id: number): T {
    return this.cardsCollection[id];
  }

  constructor(
    private prefix: CardType,
    private readonly cardsCollection: {
      [key: number]: T;
    },
    gameId: string
  ) {
    super();
    makeAutoObservable(this);
    // makeAutoSavable(
    //   this,
    //   gameId,
    //   `openedCard_${prefix}`
    //   ["_cards" as any] /*, this.gameState.saveCondition*/
    // );
  }
}
