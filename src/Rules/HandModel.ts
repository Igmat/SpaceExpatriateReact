import { makeAutoObservable } from "mobx";
import { GameState } from ".";
import { HandPlace } from "./Places/HandPlace";



export class HandModel {
  
  public cardsInHand = new HandPlace(this.gameState.cards, this.gameId)

  
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string) {
    makeAutoObservable(this);

  }

}
