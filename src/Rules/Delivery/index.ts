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
  ResourcePrimitive,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";
import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { CardSource } from "../ActionManager";

export type DeliveryOption = "charter" | "garbage";

export class ActionManager implements IActionManager {
  constructor(
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly decks: DeckManager,
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
  usedTerraformingCards: number[] = []; //использованные карты Terraforming
  tempDroppedCards: CardDefinition[] = [];
private _isEnded: boolean = false;

  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card.id);
  };

  perform = (card: CardDefinition) => {
    this.round.startOptionsStep();
    this.resources.createEngineeringMaps(this.table.engineering);
  };

  get isEnded () {
return this._isEnded;
  };

confirm = () => {
    this.deliveryOption = undefined;
    this.decks.dropCards(...this.hand.tempDroppedCards); //сброс временных карт из руки в общий сброс
    this.dropTempCards(); //очистка временных карт из руки
    this.usedTerraformingCards = []; //очистка использованных карт Terraforming
    this.resources.confirmRoundResourceActions(); // считаем очки, перемещаем ресы в мусор, сбрасываем счетчик энергии, обнуляем ресы
    this._isEnded = true;
  };

  activateDeck = (type: CardType) => {};

  activateCard = (card: number) => {
    this.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.increaseEnergyAndMapValues(); //увеличение энергии, midleMap, FinishCounter после сброса карты
  };
  activateColonyCard = (card: number) => {};

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
        this.resources.removeResourcesFromGarbage(
          option as Exclude<ResourcePrimitive, "dark matter">
        );
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

  isDisabled(place: CardSource, card: CardDefinition): boolean {
    if (place === "table") {
      if (card.type === "engineering") {
        const isEmpty =
          (card.connection === "start" &&
            !this.resources.engineeringMaps.Start[card.id]) ||
          (card.connection === "continue" &&
            !this.resources.engineeringMaps.Middle[card.id]) ||
          (card.connection === "end" &&
            !this.resources.engineeringMaps.FinishCounter);
        return isEmpty;
      }

      if (card.type === "terraforming") {
        return this.usedTerraformingCards.includes(card.id);//не подсвечивает возможности исходя из ресурсов

      }
    }

    if (place === "hand") return false;
    return true;
  }

  isDisabledDeck = (type: CardType): boolean => true;
}
