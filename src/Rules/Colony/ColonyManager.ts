import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  EngineeringCard,
  FullTrigger,
  ResourcePrimitive,
  expandTrigger,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";
import { RoundManager } from "../RoundManager";
import { toArrayArray } from "../../Utils";
import { ResourcesModel } from "../ResourcesModel";

export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameId: string,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly resources: ResourcesModel
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, this.gameId, "colony", ["colonies"]);
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: (colony: ColonyCard) => {
      const deliveryResources = toArrayArray(this.table.delivery.map(card => card.resources as ResourcePrimitive[]));

      this.round.startResourceStep(
        deliveryResources,
        (selected: ResourcePrimitive[]) => 
          selected.forEach((resource: ResourcePrimitive) => {
            this.resources.gainResource(resource);
          })
      );
      return;
    },

    adjustGarbage: () => { },
    addTempEngineering: (colony: ColonyCard) => {
      this.table.engineering.push(colony.data as (EngineeringCard & { isSelected: boolean }));
    },
    removeTempEngineering: (colony: ColonyCard) => {
      this.table.engineering.pop();
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
    return this.colonies.filter(
      (colony) =>
        colony.mutateAction === CardType
    );
  };
}
