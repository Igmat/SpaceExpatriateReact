import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  FullTrigger,
  ResourcePrimitive,
  expandTrigger,
  isSelectableEngineeringCard,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";
import { RoundManager } from "../RoundManager";
import { toArrayArray } from "../../Utils";
import { ResourcesModel } from "../ResourcesModel";
import { GameState } from "..";

export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameState: GameState,
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
    selectDeliveryStation: async (colony: ColonyCard) => {
        const deliveryResources = toArrayArray(this.table.delivery.map(card => card.resources as ResourcePrimitive[]));
        const selected = await this.round.startResourceStep(deliveryResources);
        selected.forEach((resource: ResourcePrimitive) => {
          this.resources.gainResource(resource)
        })
    },

    adjustGarbage: async () => { },

    addTempEngineering: async (colony: ColonyCard) => {
      if (isSelectableEngineeringCard(colony.data)) {
        this.table.engineering.push(colony.data);
      }
    },

    removeTempEngineering: async (colony: ColonyCard) => {
      this.table.engineering.pop();
    },

  };

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
  };

  beforePerform = async (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type);

    await Promise.all(aplicable.map((colony: ColonyCard) => {
      const before: FullTrigger = expandTrigger(colony.before);
      before.activate(this.gameState); // переделать в промис

      return Promise.all(before.effects.map((effect) =>
        this.effects[effect](colony)
      ));
    
    }))
  };

  afterPerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type);
    aplicable.forEach((colony: ColonyCard) => {
      const after: FullTrigger = expandTrigger(colony.after);
      after.activate(this.gameState);
      after.effects.forEach((effect) => {
        this.effects[effect](colony);
      });
    });
  };

  findAplicableColonyCards = (CardType: CardType): ColonyCard[] =>
    this.colonies.filter((colony) => colony.mutateAction === CardType);
}
