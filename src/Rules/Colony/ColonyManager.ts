import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,

} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";

export class ColonyManager {
  constructor(
    private readonly gameId: string,
    private readonly table: TableModel
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "colony", ["colonies"]);
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: () => {},
    adjustGarbage: () => {},
    tempEngineering: (colony:ColonyCard) => {
      this.table.engineering.push(JSON.parse(colony.benefit))
    },
    tempEngineeringRemove: (colony:ColonyCard) => {
        this.table.engineering.pop()
    },
  };

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
  };

  beforePerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type);
    aplicable.forEach((colony: ColonyCard) => {
      if (colony.before?.activate !== undefined) {
        // colony.activate();
      }
      if (colony.before?.effects !== undefined) {
        colony.before?.effects.forEach((effect) => {
           this.effects[effect](colony);
        });
      }
    });
  };
afterPerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type);
    aplicable.forEach((colony: ColonyCard) => {
      if (colony.after?.activate !== undefined) {
        // colony.activate();
      }
      if (colony.after?.effects !== undefined) {
        colony.after?.effects.forEach((effect) => {
           this.effects[effect](colony);
        });
      }
    });
  }


  findAplicableColonyCards = (
    CardType: CardType,
  ): ColonyCard[] => {
    return this.colonies.filter(
      (colony) =>
        // colony.whenIsActivated === whenIsActivated &&
        colony.mutateAction === CardType
    );
  };
}
