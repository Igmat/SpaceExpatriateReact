import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { makeAutoObservable } from "mobx";
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

export interface GameStateCards {
  delivery: { [key: number]: DeliveryCard };
  engineering: { [key: number]: EngineeringCard };
  terraforming: { [key: number]: TerraformingCard };
  military: { [key: number]: MilitaryCard };
}

export class GameState {
  constructor(public readonly gameId: string = "") {
    makeAutoObservable(this);
  }
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
    military: militaryCards
  };

  hand = new HandModel(this, this.gameId);
  decks = new DeckManager(this, this.gameId);
  colonyDeck = new ColonyDeckModel(colonyCards, this.gameId);
  table = new TableModel(this, this.gameId);
  modal = new ModalManager();
  round = new RoundManager(this.decks, this.hand, this.colonyDeck, this.gameId);
  resources = new ResourcesModel(this, this.table, this.modal, this.gameId);
  colony = new ColonyManager(this, this.gameId, this.table, this.resources, this.colonyDeck, this.hand, this.decks);
  action = new ActionManager(this, this.decks, this.table, this.round, this.hand, this.resources, this.gameId, this.colony, this.colonyDeck, this.modal);

}

const gameStateContext = createContext(new GameState())
export const { Provider } = gameStateContext;
export const useGameState = () => useContext(gameStateContext);
