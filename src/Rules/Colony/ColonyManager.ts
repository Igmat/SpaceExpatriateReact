import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints, ColonyDeckModel } from "./ColonyDeckModel";
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
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { ActionManager as TAM } from "../Terraforming";

export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string,
    private readonly table: TableModel,
    private readonly resources: ResourcesModel,
    private readonly colonyDeck: ColonyDeckModel,
    private readonly hand: HandModel
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "colony", ["colonies"]);
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: (colony: ColonyCard) => {},
    adjustGarbage: (colony: ColonyCard) => {},
    addTempEngineering: (colony: ColonyCard) => {
      if(isSelectableEngineeringCard(colony.data)){
      this.table.engineering.push(colony.data);
      }
    },
    removeTempEngineering: (colony: ColonyCard) => {
      this.table.engineering.pop();
    },
    addPointsFromColonies: (colony: ColonyCard) => {
      this.colonyDeck.openedCards.forEach((card) =>
        this.resources.extractColonyPoints(card)
      );
    },
    addPointsForMissionType: (colony: ColonyCard) => {
      this.hand.cardsInHand.forEach((card) => {
          if (card.type === (this.gameState.action.currentManager as TAM).missionType) {
              this.resources.addPoints(2);
              return;
          }
      });
    }
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
