import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { makeAutoObservable } from "mobx";
import { RoundManager } from "./RoundManager";
import { ActionManager } from "./ActionManager";
import { ResourcesModel } from "./ResourcesModel";

export class GameState {
  constructor(gameId: string) {
    makeAutoObservable(this);
  }

  hand = new HandModel(gameId);
  decks = new DeckManager(gameId);
  table = new TableModel(gameId);
  round = new RoundManager(this.decks, this.hand,gameId);
  resources = new ResourcesModel(this.table, this.round, gameId);
  action = new ActionManager(this.decks, this.table, this.round, this.hand, this.resources, gameId);

}

export const gameState = new GameState();
