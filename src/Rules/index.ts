import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { autorun, makeAutoObservable } from "mobx";
import { RoundManager } from "./RoundManager";
import { ActionManager } from "./ActionManager";
import { ResourcesModel } from "./ResourcesModel";
import { createContext, useContext } from "react";
import { ColonyManager } from "./Colony/ColonyManager";
import { ColonyDeckModel } from "./Colony/ColonyDeckModel";
import { colonyCards } from "./Colony/colony-cards";
import { ModalManager } from "./ModalManager";
import { deliveryCards } from "./CardDefinitions/delivery";
import { engineeringCards } from "./CardDefinitions/engineering";
import { terraformingCards } from "./CardDefinitions/terraforming";
import { militaryCards } from "./CardDefinitions/military";
import { DeliveryCard } from "./Cards/delivery";
import { EngineeringCard } from "./Cards/engineering";
import { MilitaryCard } from "./Cards/military";
import { TerraformingCard } from "./Cards/terraforming";
import { Serializer } from "../Utils/serializer";
import { CardsToDropPlace } from "./Places/CardsToDropPlace";

export interface GameStateCards {
  delivery: { [key: number]: DeliveryCard };
  engineering: { [key: number]: EngineeringCard };
  terraforming: { [key: number]: TerraformingCard };
  military: { [key: number]: MilitaryCard };
}

export class GameState {
  constructor(public readonly gameId: string = "") {
    makeAutoObservable(this);
    this.autoSaveToLocalStorageX();
  }

  autoSaveToLocalStorageX = () => {
    console.log("autoSaveToLocalStorage"+this.gameId);
    if (this.gameId === "") return;
    const savedData = localStorage.getItem("game" + this.gameId);

    const serializers:Serializer<any>[] = [];

    serializers.push(new Serializer("hand", this.hand.cardsInHand, ["_cards" as any]));
    serializers.push(new Serializer("colonyDeck", this.colonyDeck, ["_activeCards" as any, "openedCards"]));
    serializers.push(new Serializer("action", this.action, ["activeAction"]));
    serializers.push(new Serializer("colonyManager", this.colony, ["colonies"]));
    serializers.push(new Serializer("round", this.round, ["current","phase"]));
    serializers.push(new Serializer("resources", this.resources, ["garbageResources", "points"]));
    serializers.push(new Serializer("tableDelivery", this.table.delivery, ["_cards" as any]));
    serializers.push(new Serializer("tableEngineering", this.table.engineering, ["_cards" as any]));
    serializers.push(new Serializer("tableTerraforming", this.table.terraforming, ["_cards" as any]));
    serializers.push(new Serializer("tableMilitary", this.table.military, ["_cards" as any]));
    serializers.push(new Serializer("decksDeliveryActive", this.decks.delivery.activeCards, ["_cards" as any]));
    serializers.push(new Serializer("decksEngineeringActive", this.decks.engineering.activeCards, ["_cards" as any]));
    serializers.push(new Serializer("decksTerraformingActive", this.decks.terraforming.activeCards, ["_cards" as any]));
    serializers.push(new Serializer("decksMilitaryActive", this.decks.military.activeCards, ["_cards" as any]));
    serializers.push(new Serializer("decksDeliveryOpen", this.decks.delivery.openedCard, ["_cards" as any]));
    serializers.push(new Serializer("decksEngineeringOpen", this.decks.engineering.openedCard, ["_cards" as any]));
    serializers.push(new Serializer("decksTerraformingOpen", this.decks.terraforming.openedCard, ["_cards" as any]));
    serializers.push(new Serializer("decksMilitaryOpen", this.decks.military.openedCard, ["_cards" as any]));
    serializers.push(new Serializer("decksDeliveryDropped", this.decks.delivery.droppedCards, ["_cards" as any]));
    serializers.push(new Serializer("decksEngineeringDropped", this.decks.engineering.droppedCards, ["_cards" as any]));
    serializers.push(new Serializer("decksTerraformingDropped", this.decks.terraforming.droppedCards, ["_cards" as any]));



    if (savedData) {
      const parsedData = JSON.parse(savedData);
      serializers.forEach((serializer) => {
        serializer.deserialize(parsedData);
      });

    } else {
      this.decks.delivery.initialize();
      this.decks.engineering.initialize();
      this.decks.military.initialize();
      this.decks.terraforming.initialize();
      this.colonyDeck.initialize();
    }

    autorun(() => {
      const data = {}; 
      serializers.forEach((serializer) => {
         serializer.serialize(data);
      });
     
     localStorage.setItem("game" + this.gameId, JSON.stringify(data));
    });
    return !!savedData;
  };

  saveCondition = () => {
    if (this.round === undefined) return true;
    if (this.action === undefined) return false;
    if (this.round.current < 5) return true;
    if (this.action.activeAction === undefined) return true;
    return false;
  };

  cards: GameStateCards = {
    delivery: deliveryCards,
    engineering: engineeringCards,
    terraforming: terraformingCards,
    military: militaryCards,
  };

  cardsToDrop = new CardsToDropPlace(this.cards);
  hand = new HandModel(this, this.gameId);
  decks = new DeckManager(this, this.gameId);
  colonyDeck = new ColonyDeckModel(colonyCards, this.gameId);
  table = new TableModel(this, this.gameId);
  modal = new ModalManager();
  round = new RoundManager(this.decks, this.hand, this.colonyDeck, this.gameId);
  resources = new ResourcesModel(this, this.table, this.modal, this.gameId);
  colony = new ColonyManager(
    this,
    this.gameId,
    this.table,
    this.resources,
    this.colonyDeck,
    this.hand,
    this.decks
  );
  action = new ActionManager(
    this,
    this.decks,
    this.table,
    this.round,
    this.hand,
    this.resources,
    this.gameId,
    this.colony,
    this.colonyDeck,
    this.modal
  );
}

const gameStateContext = createContext(new GameState());
export const { Provider } = gameStateContext;
export const useGameState = () => useContext(gameStateContext);
