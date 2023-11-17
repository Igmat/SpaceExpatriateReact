import { makeAutoObservable } from "mobx";
import { GameState } from ".";
import { TablePlace } from "./Places/TablePlace";

// export interface TableColumns {
//   delivery: number[];
//   engineering: number[];
//   terraforming: number[];
//   military: number[];
// }

export class TableModel {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string) {
    makeAutoObservable(this);
  }

  public columns = {
    delivery: new TablePlace("delivery", this.gameState.cards.delivery, this.gameId),
    engineering: new TablePlace("engineering", this.gameState.cards.engineering, this.gameId),
    terraforming: new TablePlace("terraforming", this.gameState.cards.terraforming, this.gameId),
    military: new TablePlace("military", this.gameState.cards.military, this.gameId),
  };
/*
  selected: TableColumns = {
    delivery: [],
    engineering: [],
    terraforming: [],
    military: [],
  };


  resetSelected = () => {
    this.selected.delivery = [];
    this.selected.engineering = [];
    this.selected.terraforming = [];
    this.selected.military = [];
  };

  toggleSelected = (card: GeneralCard) => { 
    this.selected[card.type].includes(card.id)
      ? this.selected[card.type].splice(
          this.selected[card.type].indexOf(card.id),
          1
        )
      : this.selected[card.type].push(card.id);
  };
 
  isSelected = (card:GeneralCard) => {
    return this.selected[card.type].includes(card.id);
  };
 */
}
