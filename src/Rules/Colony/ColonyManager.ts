import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  EngineeringCard,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";

const cardEngeneering = {
  id: 111,
  type: "engineering",
  connection: "end",
  exitPoint: ["fuel", "biotic materials", "minerals"],
  points: 2,
  name: "HELIOSTAT DESERT",
  isSelected: false,
} as EngineeringCard & { isSelected: boolean };

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
    tempEngineering: () => {
      this.table.engineering.push(cardEngeneering);
      return () => {
        this.table.engineering.pop();
      };
    },
  };

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
  };

  beforePerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type, "before");
    aplicable.forEach((colony: ColonyCard) => {
      if (colony.activate !== undefined) {
        // colony.activate();
      }
      if (colony.effects !== undefined) {
        colony.effects.forEach((effect) => {
          const cancel = this.effects[effect]();
          if (cancel !== undefined) this.activeEffects.unshift(cancel);
        });
      }
    });
  };

  activeEffects: (() => void)[] = [];

  afterPerform = (type: CardType) => {
    const aplicable = this.findAplicableColonyCards(type, "after");
    aplicable.forEach((colony: ColonyCard) => {
      if (colony.activate !== undefined) {
        // colony.activate();
      }
      if (colony.effects !== undefined) {
        colony.effects.forEach((effect) => {
          this.effects[effect]();
        });
      }
    });
    this.activeEffects.forEach((cancel) => cancel());
    this.activeEffects = [];
  };

  findAplicableColonyCards = (
    CardType: CardType,
    whenIsActivated: string
  ): ColonyCard[] => {
    return this.colonies.filter(
      (colony) =>
        colony.whenIsActivated === whenIsActivated &&
        colony.mutateAction === CardType
    );
  };
}
