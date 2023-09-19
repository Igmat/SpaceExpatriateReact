import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
  Resource,
  TerraformingCard,
  EngineeringCard,
  isResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";

export type DeliveryOption = "charter" | "garbage";

export class ActionManager implements IActionManager {
  constructor(
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly decks: DeckManager
  ) {
    makeAutoObservable(this);
  }

  public calculatedResources: Resource[] = [];
  deliveryOption?: DeliveryOption;
  usedTerraformingCards: TerraformingCard[] = []; //использованные карты Terraforming
  tempDroppedCards: CardDefinition[] = [];

  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card);
  };

  perform = (card: CardDefinition) => {
    this.round.startOptionsStep();
    this.resources.createEngineeringMaps(this.table.engineering);
  };

  tryNext = () => {
    this.deliveryOption = undefined;
    this.decks.dropCards(...this.hand.tempDroppedCards); //сброс временных карт из руки в общий сброс
    this.dropTempCards(); //очистка временных карт из руки
    this.usedTerraformingCards = []; //очистка использованных карт Terraforming
    this.resources.confirmRoundResourceActions();// считаем очки, перемещаем ресы в мусор, сбрасываем счетчик энергии, обнуляем ресы
    return true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    this.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.increaseEnergyAndMapValues(); //увеличение энергии, midleMap, FinishCounter после сброса карты
  };

  activateCardOnTable = (card: CardDefinition) => {
    if (card.type === "engineering") {
      this.activateEngineeringCard(card);
    }
    if (card.type === "terraforming") {
      if (!this.usedTerraformingCards.includes(card)) {
        this.useTerraformingCard(card);
        this.resources.tryConsumeResources(card.resources, () => {
          this.resources.calculateRoundPoints(card);
        });
      }
    }
    return false;
  };

  select = (option: string) => {
    if (option === "charter" || option === "garbage") {
      this.deliveryOption = option;
      return;
    }
    if (isResourcePrimitive(option)) {
      if (this.deliveryOption === undefined) return;
      if (this.deliveryOption === "charter") {
        this.resources.addResource(option);
      }
      if (this.deliveryOption === "garbage") {
        this.resources.removeResourcesFromGarbage(option);
      }
      this.resources.getResources();
      this.round.startPerformingStep();
    }
  };

  addCardsToTempDrop = (ind: number) => {
    const card = this.hand.cardsInHand[ind];
    this.tempDroppedCards.push(card); //пушим карту во временный сброс
    this.hand.dropCard(ind); //вырезаем карту из руки
    // console.log(this.tempDroppedCards)
    return card;
  };

  reset = () => {
    this.resetTempDroppedCards();
    this.usedTerraformingCards = [];
    this.resources.resetRoundState();
    this.resources.createEngineeringMaps(this.table.engineering); // потеряли в прошлой версии, что мы обнуляем счетчики
  };

  dropTempCards = () => {
    this.tempDroppedCards = []; //очищаем временный сброс
  };
  resetTempDroppedCards = () => {
    this.tempDroppedCards.forEach((card) => this.hand.cardsInHand.push(card));
    this.tempDroppedCards = [];
  };

  activateEngineeringCard(card: EngineeringCard) {
    if (card.connection === "start") {
      this.processStartConnection(card);
    }
    if (card.connection === "continue") {
      this.processContinueConnection(card);
    }
    if (card.connection === "end") {
      this.processEndConnection(card);
    }
  }

  processStartConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.Start[card.id] === 0) return;
    this.resources.tryConsumeResources(
      card.entryPoint ? [card.entryPoint] : [],
      () => {
        this.resources.useCardConnection(card);
        this.resources.calculateRoundPoints(card);
      }
    );
  }

  processContinueConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.Middle[card.id] <= 0) return;
    this.resources.tryConsumeResources(
      card.entryPoint ? [card.entryPoint] : [],
      () => {
        this.resources.calculateRoundPoints(card);
        this.resources.useCardConnection(card);
        this.resources.gainResources(card);
      }
    );
  }

  processEndConnection(card: EngineeringCard) {
    if (this.resources.engineeringMaps.FinishCounter <= 0) return;
    this.resources.tryConsumeResources(
      card.entryPoint ? [card.entryPoint] : [],
      () => {
        this.resources.calculateRoundPoints(card);
        this.resources.useCardConnection(card);
        this.resources.gainResources(card);
      }
    );
  }
}
