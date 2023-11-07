import { makeAutoObservable } from "mobx";
import {
  CardDefinition,
  DeliveryCard,
  EngineeringCard,
  MilitaryCard,
  TerraformingCard,
} from "./card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";
import { GameState } from ".";

export class TableModel {
  constructor(private readonly gameState: GameState, gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(
      this,
      gameId,
      "table",
      ["columns"] as any,
      this.gameState.saveCondition
    );
  }
  private columns: {
    delivery: number[];
    engineering: number[];
    terraforming: number[];
    military: number[];
  } = {
    delivery: [],
    engineering: [],
    terraforming: [],
    military: [],
  };

  get delivery(): readonly DeliveryCard[] {
    return this.columns.delivery.map(
      (id) => this.gameState.decks.delivery.cardsDefinitions[id]
    );
  }

  tempEngineering: EngineeringCard[] = [];

  get engineering(): readonly EngineeringCard[] {
    return this.columns.engineering.map(
      (id) => this.gameState.decks.engineering.cardsDefinitions[id]
    ).concat(this.tempEngineering);
  }

  get terraforming(): readonly TerraformingCard[] {
    return this.columns.terraforming.map(
      (id) => this.gameState.decks.terraforming.cardsDefinitions[id]
    );
  }
  get military(): readonly MilitaryCard[] {
    return this.columns.military.map(
      (id) => this.gameState.decks.military.cardsDefinitions[id]
    );
  }

  selected: {
    delivery: number[];
    engineering: number[];
    terraforming: number[];
    military: number[];
  } = {
    delivery: [],
    engineering: [],
    terraforming: [],
    military: [],
  };

  dropCards = (
    ...cards: (
      | DeliveryCard
      | EngineeringCard
      | TerraformingCard
      | MilitaryCard
    )[]
  ) => {
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
  };

  takeCard = (card: CardDefinition) => {
    this.columns[card.type].push(card.id);
  };

  resetSelected = () => {
    this.selected.delivery = [];
    this.selected.engineering = [];
    this.selected.terraforming = [];
    this.selected.military = [];
  };

  toggleSelected = (card: CardDefinition) => {
    this.selected[card.type].includes(card.id)
      ? this.selected[card.type].splice(
          this.selected[card.type].indexOf(card.id),
          1
        )
      : this.selected[card.type].push(card.id);
  };

  isSelected = (card: CardDefinition) => {
    return this.selected[card.type].includes(card.id);
  };

  isOnTable = (card: CardDefinition) => {
    return this.columns[card.type].some((id) => id === card.id);
  };
}
