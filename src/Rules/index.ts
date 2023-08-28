import { HandModel } from "../Rules/HandModel";
import { DeckManager } from "./DeckManager";
import { TableModel } from "./TableModel";
import { makeAutoObservable } from "mobx";
import { RoundManager } from "./RoundManager";
import { ActionManager } from "./ActionManager";

export class GameState {
  constructor() {
    makeAutoObservable(this);
  }

  hand = new HandModel();
  decks = new DeckManager();
  table = new TableModel();
  round = new RoundManager(this.decks, this.hand);
  action = new ActionManager(this.decks, this.table, this.round, this.hand);
}

export const gameState = new GameState();
