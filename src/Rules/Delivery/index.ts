import { makeAutoObservable } from "mobx";
import { IActionManager } from "../IActionManager";
import { TableModel } from "../TableModel";
import {
  CardType,
  Resource,
  BasicResources,
  BasicResource,
  GeneralCard,
} from "../card-types";
import { ResourcesModel } from "../ResourcesModel";
import { HandModel } from "../HandModel";
import { RoundManager } from "../RoundManager";
import { DeckManager } from "../DeckManager";
// import { makeAutoSavable } from "../../Utils/makeAutoSavable";
import { ModalManager } from "../ModalManager";
import { EngineeringCard } from "../Cards/engineering";
import { TerraformingCard } from "../Cards/terraforming";
import { GameState } from "..";
import { CardsToDropPlace } from "../Places/CardsToDropPlace";

const DeliveryOptions = ["charter", "garbage"] as const;
export type DeliveryOption = (typeof DeliveryOptions)[number];

export class ActionManager implements IActionManager {
  constructor(
    private readonly gameState: GameState,
    private readonly table: TableModel,
    private readonly round: RoundManager,
    private readonly hand: HandModel,
    private readonly resources: ResourcesModel,
    private readonly decks: DeckManager,
    private readonly modal: ModalManager,
    private readonly gameId: string
  ) {
    makeAutoObservable(this);
    // makeAutoSavable(this, gameId, "deliveryManager", [
    //   "calculatedResources",
    //   "deliveryOption",
    //   "usedTerraformingCards",
    // ]);
  }

  public calculatedResources: Resource[] = [];
  deliveryOption?: DeliveryOption;
  selectedResource?: BasicResource;
  _usedTerraformingCards: number[] = []; //использованные карты Terraforming
  
  private _tempDroppedCards = new CardsToDropPlace(
    this.gameState.cards,
    this.gameId
  );

  private _isEnded: boolean = false;

  get isEnded() {
    return this._isEnded;
  }

  useTerraformingCard = (card: TerraformingCard) => {
    this._usedTerraformingCards.push(card.id);
  };

  perform = async (card: GeneralCard) => {
    this._isEnded = false;
    this.round.startOptionsStep();
    this.deliveryOption = await this.modal.show(
      "deliveryOptions",
      DeliveryOptions
    );
    this.selectedResource = await this.modal.show(
      "deliveryResources",
      BasicResources
    );

    if (this.deliveryOption === "charter") {
      this.resources.addResource(this.selectedResource);
    }

    if (this.deliveryOption === "garbage") {
      this.resources.removeResourcesFromGarbage(this.selectedResource);
    }

    await this.resources.getResources(this.table.delivery.cards);
    this.round.startPerformingStep();
    this.resources.createEngineeringMaps(this.table.engineering.cards);
  };

  confirm = async () => {
    this.deliveryOption = undefined;

    //сброс временных карт из руки в общий сброс
    this._tempDroppedCards.cards.forEach(card => card.move(this.decks[card.type].droppedCards)); 

    this._usedTerraformingCards = []; //очистка использованных карт Terraforming
    this.resources.confirmRoundResourceActions(); // считаем очки, перемещаем ресы в мусор, сбрасываем счетчик энергии, обнуляем ресы
    this._isEnded = true;
  };

  activateDeck = async (type: CardType) => { };

  activateCard = async (card: GeneralCard) => {
    this.addCardsToTempDrop(card); //сброс карты с руки во временное хранилище
    this.resources.increaseEnergyAndMapValues(); //увеличение энергии, midleMap, FinishCounter после сброса карты
  };
  addCardsToTempDrop = (card: GeneralCard) => {
    card.move(this._tempDroppedCards); //сброс карты с руки во временное хранилище
  };

  activateColonyCard = async (card: number) => { };

  activateCardOnTable = async (card: GeneralCard) => {
    if (card.type === "engineering") {
      await this.activateEngineeringCard(card);
    }
    if (card.type === "terraforming") {
      if (!this._usedTerraformingCards.includes(card.id)) {
        const successfulConsumeResources =
          await this.resources.tryConsumeResources(card.resources);

        if (successfulConsumeResources) {
          this.resources.calculateRoundPoints(card);
          this.useTerraformingCard(card);
        }
      }
    }
    return false;
  };

  reset = async () => {
    this._tempDroppedCards.cards.forEach((card) => card.move(this.hand.cardsInHand));
    this._usedTerraformingCards = [];
    await this.resources.resetRoundState();
  };
  
  activateEngineeringCard = async (card: EngineeringCard) => {
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
    (await this.resources.tryConsumeResources(
      card.entryPoint ? [card.entryPoint] : []
    )) && this.resources.handleCardProcessing(card);
  };

  //эти методы нужно будет добавить в интерфейс

  isDisabled(card: GeneralCard): boolean {
    if (card.isOnTable) {
        const isEmpty =
          (card.type === "engineering" && card.connection  === "start" &&
            !this.resources.engineeringMaps.Start[card.id]) ||
          (card.type === "engineering" && card.connection === "continue" &&
            !this.resources.engineeringMaps.Middle[card.id]) ||
          (card.type === "engineering" && card.connection === "end" &&
            !this.resources.engineeringMaps.FinishCounter);
        return isEmpty;
      }

      if (card.type === "terraforming") {
        return this._usedTerraformingCards.includes(card.id); //не подсвечивает возможности исходя из ресурсов
      }
  
  if (card.isInHand) return false;
    return true;
  }

  isDisabledDeck = (type: CardType): boolean => true;

}
