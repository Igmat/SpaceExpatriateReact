import { makeAutoObservable } from "mobx";
import { CardType } from "../card-types";
import { BasicPlace } from ".";
import { BasicCard } from "../Cards";

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
    /* makeAutoSavable(
             this,
             gameId,
             "prefix",
             ["cardsId"  as any],
             this.gameState.saveCondition
         );*/
  }
}
