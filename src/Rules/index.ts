import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { makeAutoObservable } from "mobx";
import { RoundManager } from "./RoundManager";
import { ActionManager } from "./ActionManager";
import { ResourcesModel } from "./ResourcesModel";

export class GameState {
  constructor() {
    makeAutoObservable(this);
  }

  hand = new HandModel();
  decks = new DeckManager();
  table = new TableModel();
  resources = new ResourcesModel(this.table);
  round = new RoundManager(this.decks, this.hand, this.resources);
  action = new ActionManager(this.decks, this.table, this.round, this.hand,  this.resources);

}

export const gameState = new GameState();
