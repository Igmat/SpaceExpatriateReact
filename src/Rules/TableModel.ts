import { makeAutoObservable } from "mobx";
import { GeneralCard} from "./card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { GameState } from ".";
import { TablePlace } from "./Places/TablePlace";


export interface TableColumns {
  delivery: number[];
  engineering: number[];
  terraforming: number[];
  military: number[];
}


export class TableModel {
  constructor(
    private readonly gameState: GameState,
    private readonly gameId: string) {
    makeAutoObservable(this);
  }

  public columns = {
    delivery: new TablePlace("delivery", this.gameState.cards, this.gameId),
    engineering: new TablePlace("engineering", this.gameState.cards, this.gameId),
    terraforming: new TablePlace("terraforming", this.gameState.cards, this.gameId),
    military: new TablePlace("military", this.gameState.cards, this.gameId),
  };

/*
  get delivery(): readonly DeliveryCard[] {
    return this.columns.delivery.map(
      (id) => this.gameState.cards.delivery[id]
    );
  }

  tempEngineering: EngineeringCard[] = [];

  get engineering(): readonly EngineeringCard[] {
    return this.columns.engineering
      .map((id) => this.gameState.cards.engineering[id])
      .concat(this.tempEngineering);
  }

  get terraforming(): readonly TerraformingCard[] {
    return this.columns.terraforming.map(
      (id) => this.gameState.cards.terraforming[id]
    );
  }
  get military(): readonly MilitaryCard[] {
    return this.columns.military.map(
      (id) => this.gameState.cards.military[id]
    );
  }
*/
  selected: TableColumns = {
    delivery: [],
    engineering: [],
    terraforming: [],
    military: [],
  };

  
  dropCards = (
    ...cards: GeneralCard[]
  ) => {
    cards.forEach(card => card.move(this.drop))
    /*
    this.columns.delivery = this.columns.delivery.filter(
      (id) => !cards.map((card) => card.id).includes(id)
    );
    this.columns.engineering = this.columns.engineering.filter(
      (id) => !cards.map((card) => card.id).includes(id)
    );
    this.columns.terraforming = this.columns.terraforming.filter(
      (id) => !cards.map((card) => card.id).includes(id)
    );
    this.columns.military = this.columns.military.filter(
      (id) => !cards.map((card) => card.id).includes(id)
    );
    return cards;
    */
  };
/*
  takeCard = (card: GeneralCard) => {
    this.columns[card.type].push(card.id);
  };
*/
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
/*
  isOnTable = (card: GeneralCard) => {
    return this.columns[card.type].some((id) => id === card.id);
  };
  */
}
