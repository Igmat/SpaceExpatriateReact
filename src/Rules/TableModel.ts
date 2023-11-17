import { makeAutoObservable } from "mobx";
import { GameState } from ".";
import { TablePlace } from "./Places/TablePlace";


export class TableModel {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string) {
    makeAutoObservable(this);
  }
    public delivery = new TablePlace("delivery", this.gameState.cards.delivery, this.gameId);
    public engineering = new TablePlace("engineering", this.gameState.cards.engineering, this.gameId);
    public terraforming = new TablePlace("terraforming", this.gameState.cards.terraforming, this.gameId);
    public military = new TablePlace("military", this.gameState.cards.military, this.gameId);

}
