import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import { CardType, ColonyCard } from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";

export class ColonyManager {
  constructor(private readonly gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "colony", [
      "colonies",
    ])
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: () => { },
    adjustGarbage: () => { },
  };

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
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
