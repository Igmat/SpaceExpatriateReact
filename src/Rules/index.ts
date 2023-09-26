import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { makeAutoObservable } from "mobx";
import { RoundManager } from "./RoundManager";
import { ActionManager } from "./ActionManager";
import { ResourcesModel } from "./ResourcesModel";
import { createContext, useContext } from "react";

export class GameState {
  constructor() {
    makeAutoObservable(this);
  }

  hand = new HandModel();
  decks = new DeckManager();
  table = new TableModel();
  round = new RoundManager(this.decks, this.hand);
  resources = new ResourcesModel(this.table, this.round);
  action = new ActionManager(this.decks, this.table, this.round, this.hand, this.resources);

}

const gameStateContext = createContext(new GameState())
export const { Provider } = gameStateContext;
export const useGameState = () => useContext(gameStateContext);
