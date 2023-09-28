import { makeAutoObservable } from "mobx";
import { makeAutoSavable } from "../Utils/makeAutoSavable";

export class GameStore {
  constructor() {
    makeAutoObservable(this);
    makeAutoSavable(this, "gameStore", "savedGameIdsPrefix", ["savedGameIds"]);
  }
  
  savedGameIds: string[] = [];

  addSavedGameId = (gameId: string) => {
    if (!this.savedGameIds.includes(gameId)) {
      this.savedGameIds.push(gameId);
    }
  };

  deleteSavedGameId = (gameId: string) => {
    this.savedGameIds = this.savedGameIds.filter((id) => id !== gameId);
  };
  deleteAllSavedGameIds = () => {
    this.savedGameIds = [];
  };
}

export const gameStore = new GameStore();
