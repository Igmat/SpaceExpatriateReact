import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  FullTrigger,
  expandTrigger,
  isSelectableEngineeringCard,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";
import { GameState } from "..";

export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameState: GameState,
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
    addTempEngineering: (colony: ColonyCard) => {
      if(isSelectableEngineeringCard(colony.data)){
      this.table.engineering.push(colony.data);
      }
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
      before.activate(this.gameState);
      before.effects.forEach((effect) => {
        this.effects[effect](colony);
      });
    });
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
