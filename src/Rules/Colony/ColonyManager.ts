import { makeAutoObservable, reaction } from "mobx";
import { ColonyCardWithPoints, ColonyDeckModel } from "./ColonyDeckModel";
import {
  CardType,
  ColonyCard,
  FullTrigger,
  TriggerName,
  TriggerNames,
  expandTrigger,
  isSelectableEngineeringCard,
} from "../card-types";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { TableModel } from "../TableModel";
import { ResourcesModel } from "../ResourcesModel";
import { GameState } from "..";
import { HandModel } from "../HandModel";
import { ActionManager as TAM } from "../Terraforming";
import { ActionManager as EAM } from "../Engineering";
import { DeckManager } from "../DeckManager";


export type EffectName = keyof ColonyManager["effects"];

export class ColonyManager {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string,
    private readonly table: TableModel,
    private readonly resources: ResourcesModel,
    private readonly colonyDeck: ColonyDeckModel,
    private readonly hand: HandModel,
    private readonly decks: DeckManager
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, this.gameId, "colony", ["colonies"]);
  }

  colonies: ColonyCard[] = [];

  effects = {
    selectDeliveryStation: async (colony: ColonyCard) => {

      const originalGetResources = this.resources.getResources;

      this.resources.getResources = async () => {
        const availableCards = this.table.delivery.filter(card =>
          card.resources
            .filter(resource => this.resources.garbageResources[resource] > 0).length > 0
        )
        if (availableCards.length === 0) {
          await originalGetResources();
        } else if (availableCards.length === 1) {
          await originalGetResources();
          const resources = availableCards[0].resources;
          resources.forEach(resource => this.resources.playerResources[resource]++);
        } else {
          const selected = await this.gameState.modal.show("blackMarket", availableCards);
          const originalTableCards = this.table.delivery;
          this.table.delivery =
            this.table.delivery.filter(card => card !== selected);
          await originalGetResources();
          console.log(this.table.delivery);
          this.table.delivery = originalTableCards;
          selected.resources.forEach(resource => this.resources.playerResources[resource]++);
        }
      }
      return async () => {
        this.resources.getResources = originalGetResources;
      }
    },

    addTempEngineering: async (colony: ColonyCard) => {
      if (isSelectableEngineeringCard(colony.data)) {
        this.table.engineering.push(colony.data);
      }
      return async () => {
        this.table.engineering.pop();
      };
    },

    // removeTempEngineering: async (colony: ColonyCard) => {
    //   this.table.engineering.pop();
    // },

    addPointsFromColonies: async (colony: ColonyCard) => {
      this.colonyDeck.openedCards.forEach((card) =>
        this.resources.extractColonyPoints(card)
      );
    },
    addPointsForMissionType: async (colony: ColonyCard) => {
      this.hand.cardsInHand.forEach((card) => {
        if (
          card.type ===
          (this.gameState.action.currentManager as TAM).missionType
        ) {
          this.resources.addPoints(2);
        }
      });
    },

    dockDeliveryModule: async (colony: ColonyCard) => {
      (this.gameState.action.currentManager as EAM).adjustRemainingActivateDeck(
        1
      );
      this.gameState.action.currentManager?.activateDeck("delivery");
    },

    adjustRemainingActions: async (colony: ColonyCard) => {
      (this.gameState.action.currentManager as EAM).adjustRemainingActivateDeck(
        1
      );
      (this.gameState.action.currentManager as EAM).adjustRemainingActivateCard(
        -1
      );
    },

    changeEngineeringLogic: async (colony: ColonyCard) => {
      const currentManager = this.gameState.action.currentManager as EAM;
      currentManager.activateDeck = (type: CardType) => {
        if (currentManager.remaining.activateDeck === 0) return;
        currentManager.adjustRemainingActivateDeck(-1);
        this.hand.takeCard(this.decks[type].takeCard()!);
        currentManager.adjustRemainingActivateCard(1);
        return currentManager.confirm();
      };
    },

    dockStationModuleOfMissionType: async (colony: ColonyCard) => {
      this.table.takeCard(
        this.decks[
          (this.gameState.action.currentManager as TAM).missionType!
        ].takeCard()!
      );
    },
    pointsForDocking: async (colony: ColonyCard) => {
      const cancelReaction = reaction(
        () => [
          this.table.delivery.length,
          this.table.engineering.length,
          this.table.terraforming.length,
          this.table.military.length,
        ],
        () => {
          this.resources.addPoints(1);
        }
      );
      return async () => cancelReaction();
    },
  };

  activeEffects: (() => Promise<void>)[] = [];

  private executeTrigger = async (type: CardType, triggerName: TriggerName) => {
    const aplicable = this.findAplicableColonyCards(type);

    await Promise.all(
      aplicable.map((colony: ColonyCard) => {
        const trigger: FullTrigger = expandTrigger(
          colony.triggers[triggerName]
        );
        trigger.activate(this.gameState);

        return Promise.all(
          trigger.effects.map(async (effect) => {
            const cancel = await this.effects[effect](colony);
            if (cancel !== undefined) this.activeEffects.unshift(cancel);
          })
        );
      })
    );
  };

  cancelActiveEffects = async () => {
    await Promise.all(this.activeEffects.map(async (effect) => effect()));
    this.activeEffects = [];
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
