import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardDefinition,
  CardType,
  Resource,
  TerraformingCard,
  EngineeringCard,
  ResourcePrimitive,
  isResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { ModalManager, ResourcesModalOption } from "../ModalManager";

export type DeliveryOption = "charter" | "garbage";

export class ActionManager implements IActionManager {
  constructor(
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly decks: DeckManager,
    private readonly modal: ModalManager,
    gameId: string
  ) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "deliveryManager", [
      "calculatedResources",
      "deliveryOption",
      "usedTerraformingCards",
      "tempDroppedCards",
    ]);
  }

  public calculatedResources: Resource[] = [];
  deliveryOption?: DeliveryOption;
  selectedResource?: Exclude<ResourcePrimitive, "dark matter">;
  usedTerraformingCards: number[] = []; //использованные карты Terraforming
  tempDroppedCards: CardDefinition[] = [];

  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card.id);
  };

  perform = async (card: CardDefinition) => {
    this.round.startOptionsStep();
    this.deliveryOption = await this.modal.show("deliveryOptions", ["charter", "garbage"])
    this.selectedResource = await this.modal.show("deliveryResources",
      ["fuel", "minerals", "biotic materials", "machinery", "nanotechnologies"])

    if (isResourcePrimitive(this.selectedResource) && (this.deliveryOption === "charter")) {
      this.resources.addResource(this.selectedResource);
    }

    if (this.deliveryOption === "garbage") {
      this.resources.removeResourcesFromGarbage(
        this.selectedResource as ResourcesModalOption
      );
    }
    this.resources.getResources();
    this.round.startPerformingStep();
    this.resources.createEngineeringMaps(this.table.engineering);
  };

  tryNext = () => {
    //    this.deliveryOption = undefined;
    this.decks.dropCards(...this.hand.tempDroppedCards); //сброс временных карт из руки в общий сброс
    this.dropTempCards(); //очистка временных карт из руки
    this.usedTerraformingCards = []; //очистка использованных карт Terraforming
    this.resources.confirmRoundResourceActions(); // считаем очки, перемещаем ресы в мусор, сбрасываем счетчик энергии, обнуляем ресы
    return true;
  };

  activateDeck = (type: CardType) => { };

  activateCard = (card: number) => {
    this.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.increaseEnergyAndMapValues(); //увеличение энергии, midleMap, FinishCounter после сброса карты
  };
  
  activateColonyCard = (card: number) => { };

  activateCardOnTable = (card: CardDefinition) => {
    if (card.type === "engineering") {
      this.activateEngineeringCard(card);
    }
    if (card.type === "terraforming") {
      if (!this.usedTerraformingCards.includes(card.id)) {
        this.resources.tryConsumeResources(card.resources, () => {
          this.resources.calculateRoundPoints(card);
          this.useTerraformingCard(card);
        });
      }
    }
    return false;
  };

  addCardsToTempDrop = (ind: number) => {
    const card = this.hand.cardsInHand[ind];
    this.tempDroppedCards.push(card); //пушим карту во временный сброс
    this.hand.dropCard(ind); //вырезаем карту из руки
    return card;
  };

  reset = () => {
    this.resetTempDroppedCards();
    this.usedTerraformingCards = [];
    this.resources.resetRoundState();
  };

  dropTempCards = () => {
    this.tempDroppedCards = []; //очищаем временный сброс
  };
  resetTempDroppedCards = () => {
    this.tempDroppedCards.forEach((card) => this.hand.cardsInHand.push(card));
    this.tempDroppedCards = [];
  };

  activateEngineeringCard(card: EngineeringCard) {
    if (
      card.connection === "start" &&
      this.resources.engineeringMaps.Start[card.id] === 0
    )
      return;
    if (
      card.connection === "continue" &&
      this.resources.engineeringMaps.Middle[card.id] <= 0
    )
      return;
    if (
      card.connection === "end" &&
      this.resources.engineeringMaps.FinishCounter <= 0
    )
      return;
    this.resources.tryConsumeResources(
      card.entryPoint ? [card.entryPoint] : [],
      () => this.resources.handleCardProcessing(card)
    );
  }

  isDisabled(place: string, card: CardDefinition,): boolean {
    if (this.usedTerraformingCards.includes(card.id)) {
      return true;
    }
    if (this.round.phase === "delivery") {
      if (place === "table") {
        if (card.type === "engineering") {
          if (
            (card.connection === "start" &&
              this.resources.engineeringMaps.Start[card.id] === 0) ||
            (card.connection === "continue" &&
              this.resources.engineeringMaps.Middle[card.id] <= 0) ||
            (card.connection === "end" &&
              this.resources.engineeringMaps.FinishCounter <= 0)
          )
            return true;
        }
        if (card.type === "military") return true;
        if (card.type === "delivery") return true;
      }
      if (place === "hand") return false;
      if (place === "opened") return true;
    }
    return false;
  }

  isDisabledDeck = (type: CardType): boolean => {
    if (this.round.phase === "delivery") return true;
    return false;
  };
}
