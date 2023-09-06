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
  playerTable = new TableModel();
  resources = new ResourcesModel(this.playerTable);
  round = new RoundManager(this.decks, this.hand, this.resources);
  action = new ActionManager(this.decks, this.playerTable, this.round, this.hand);

}

export const gameState = new GameState();
