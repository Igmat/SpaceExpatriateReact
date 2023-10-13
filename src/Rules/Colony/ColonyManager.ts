import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints, ColonyDeckModel } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  EngineeringCard,
  FullTrigger,
  expandTrigger,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";
import { ResourcesModel } from "../ResourcesModel";

export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameId: string,
    private readonly table: TableModel,
    private readonly resources: ResourcesModel,
    private readonly colonyDeck: ColonyDeckModel
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "colony", ["colonies"]);
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: () => {},
    adjustGarbage: () => {},
    addTempEngineering: (colony: ColonyCard) => {
      this.table.engineering.push(
        colony.data as EngineeringCard & { isSelected: boolean }
      );
    },
    removeTempEngineering: (colony: ColonyCard) => {
      this.table.engineering.pop();
    },
    addPointsFromColonies: (colony: ColonyCard) => {
      this.colonyDeck.openedCards.forEach((card) =>
        this.resources.extractColonyPoints(card)
      );
    },
  };

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
  };

  beforePerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type);
    aplicable.forEach((colony: ColonyCard) => {
      const before: FullTrigger = expandTrigger(colony.before);
      if (before.activate !== undefined) {
        // before.activate();
      }
      if (before.effects !== undefined) {
        before.effects.forEach((effect) => {
          this.effects[effect](colony);
        });
      }
    });
  };

  afterPerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type);
    aplicable.forEach((colony: ColonyCard) => {
      const after: FullTrigger = expandTrigger(colony.after);
      if (after.activate !== undefined) {
        // colony.activate();
      }
      if (after.effects !== undefined) {
        after.effects.forEach((effect) => {
          this.effects[effect](colony);
        });
      }
    });
  };

  findAplicableColonyCards = (CardType: CardType): ColonyCard[] => {
    return this.colonies.filter((colony) => colony.mutateAction === CardType);
  };
}
