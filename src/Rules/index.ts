import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { makeAutoObservable } from "mobx";
import { RoundManager } from "./RoundManager";
import { ActionManager } from "./ActionManager";
import { ResourcesModel } from "./ResourcesModel";
import { createContext, useContext } from "react";

export class GameState {
  constructor(public readonly gameId: string = "") {
    makeAutoObservable(this);
  }

  hand = new HandModel(this.gameId);
  decks = new DeckManager(this.gameId);
  table = new TableModel(this.gameId);
  round = new RoundManager(this.decks, this.hand,this.gameId);
  resources = new ResourcesModel(this.table, this.round, this.gameId);
  action = new ActionManager(this.decks, this.table, this.round, this.hand, this.resources, this.gameId);

}

const gameStateContext = createContext(new GameState())
export const { Provider } = gameStateContext;
export const useGameState = () => useContext(gameStateContext);
