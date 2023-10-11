import { makeAutoObservable } from "mobx";
import { ColonyDeckModel } from "./ColonyDeckModel";
import { colonyCards } from "./colony-cards";
import { CardType, ColonyCard } from "../card-types";

export class ColonyManager {
  constructor(private readonly gameId: string) {
    makeAutoObservable(this);
  }

  colonies: ColonyCard[] = [];
  colonyDeck = new ColonyDeckModel(colonyCards, this.gameId);

  effects = {
    selectDeliveryStation: () => { },
    adjustGarbage: () => { },
  };

  beforePerform = (card: any) => {
    const aplicable = this.findAplicableColonyCards(card.type, "before");
    aplicable.forEach((colony: ColonyCard) => {
      if (colony.activate !== undefined) {
        // colony.activate();
      }
      if (colony.effects !== undefined) {
        colony.effects.forEach((effect) => {
          // this.effects[effect]();
        });
      }
    });
  };

  findAplicableColonyCards = (
    CardType: CardType,
    whenIsActivated: string
  ): ColonyCard[] => {
    // проверить. праивльно ли работает метод
    return this.colonies.filter(
      (colony) =>
        colony.whenIsActivated === whenIsActivated &&
        colony.mutateAction === CardType
    );
  };

}
