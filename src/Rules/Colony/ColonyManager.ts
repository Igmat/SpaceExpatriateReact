import { makeAutoObservable } from "mobx";
import { ColonyCardWithPoints, ColonyDeckModel } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  FullTrigger,
  ResourcePrimitive,
  TriggerName,
  TriggerNames,
  expandTrigger,
  isSelectableEngineeringCard,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";
import { RoundManager } from "../RoundManager";
import { GarbageResources, ResourcesModel } from "../ResourcesModel";
import { GameState } from "..";
import { HandModel } from "../HandModel";
import { ActionManager as TAM } from "../Terraforming";
import { ActionManager as EAM } from "../Engineering";

export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly resources: ResourcesModel,
    private readonly colonyDeck: ColonyDeckModel,
    private readonly hand: HandModel
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, this.gameId, "colony", ["colonies"]);
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: async (colony: ColonyCard) => {
      const getValidCombination = (
        deliveryResources: Exclude<ResourcePrimitive, "dark matter">[][],
        garbageResources: GarbageResources
      ) => {
        const garbageResourcesFiltered = Object.entries(garbageResources)
          .filter(([_, value]) => value > 0)
          .reduce(
            (acc, [key, value]) => ({ ...acc, [key]: value }),
            {} as GarbageResources
          );
        const garbageResourcesArray = Object.keys(garbageResourcesFiltered);
        return deliveryResources.filter((array) =>
          array.some((resource) =>
            garbageResourcesArray.some(
              (garbageResource) => garbageResource === resource
            )
          )
        );
      };

      const deliveryResources = this.table.delivery.map(
        (card) => card.resources as Exclude<ResourcePrimitive, "dark matter">[]
      );
      const validCardCombinations = getValidCombination(
        deliveryResources,
        this.resources.garbageResources
      );
      const selected = await this.round.startResourceStep(
        validCardCombinations
      );
      selected.forEach((resource) => {
        this.resources.gainResource(resource);
      });
    },

    adjustGarbage: async () => {},

    addTempEngineering: async (colony: ColonyCard) => {
      if (isSelectableEngineeringCard(colony.data)) {
        this.table.engineering.push(colony.data);
      }
    },

    removeTempEngineering: async (colony: ColonyCard) => {
      this.table.engineering.pop();
    },
    addPointsFromColonies: async (colony: ColonyCard) => {
      this.colonyDeck.openedCards.forEach((card) =>
        this.resources.extractColonyPoints(card)
      );
    },
    addPointsForMissionType: async (colony: ColonyCard) => {
      this.hand.cardsInHand.forEach((card) => {
        if (card.type ===
          (this.gameState.action.currentManager as TAM).missionType
        ) {this.resources.addPoints(2);}
      });
    },

    dockDeliveryModule: async (colony: ColonyCard) => {
      (this.gameState.action.currentManager as EAM).setRemainingActivateDeck(1);
      this.gameState.action.currentManager?.activateDeck("delivery");
    },

    adjustRemainingActions: async (colony: ColonyCard) => {
      (this.gameState.action.currentManager as EAM).setRemainingActivateDeck(1);
      (this.gameState.action.currentManager as EAM).setRemainingActivateCard(-1);
    },

    changeEngineeringLogic: async (colony: ColonyCard) => {
      (this.gameState.action.currentManager as EAM).setEngineeringLogic();
    },
  };

  private executeTrigger = async (type: CardType, triggerName: TriggerName) => {
    const aplicable = this.findAplicableColonyCards(type);

    await Promise.all(
      aplicable.map((colony: ColonyCard) => {
        const trigger: FullTrigger = expandTrigger(
          colony.triggers[triggerName]
        );
        trigger.activate(this.gameState);

        return Promise.all(
          trigger.effects.map((effect) => this.effects[effect](colony))
        );
      })
    );
  };

  private getTriggerExecutor =
    (triggerName: TriggerName) => async (type: CardType) =>
      this.executeTrigger(type, triggerName);

  triggers = TriggerNames.reduce(
    (acc, trigger) => (acc[trigger] = this.getTriggerExecutor(trigger)) && acc,
    {} as { [key in TriggerName]: (type: CardType) => Promise<void> }
  );

  findAplicableColonyCards = (CardType: CardType): ColonyCard[] =>
    this.colonies.filter((colony) => colony.mutateAction === CardType);

  takeColonyCard = (card: ColonyCardWithPoints) => {
    this.colonies.push(card);
  };
}
