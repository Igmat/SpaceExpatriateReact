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
      ["delivery", "engineering", "terraforming", "military"],
      this.gameState.saveCondition
    );
  }

  delivery: DeliveryCard[] = [];
  engineering: EngineeringCard[] = [];
  terraforming: TerraformingCard[] = [];
  military: MilitaryCard[] = [];

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
    //очистить сброшенные карты со стола
    ...cards: (
      | DeliveryCard
      | EngineeringCard
      | TerraformingCard
      | MilitaryCard
    )[]
  ) => {
    this.delivery = this.delivery.filter((card) => !cards.includes(card));
    this.engineering = this.engineering.filter((card) => !cards.includes(card));
    this.terraforming = this.terraforming.filter(
      (card) => !cards.includes(card)
    );
    this.military = this.military.filter((card) => !cards.includes(card));
    return cards;
  };

  takeCard = (card: CardDefinition) => {
    this[card.type].push(card as any);
  };

  resetSelectedFlags = () => {
    this.selected.delivery = [];
    this.selected.engineering = [];
    this.selected.terraforming = [];
    this.selected.military = [];
  };

  toggleSelectedFlag = (card: CardDefinition) => {
    this.selected[card.type].includes(card.id)
      ? this.selected[card.type].splice(
          this.selected[card.type].indexOf(card.id),
          1
        )
      : this.selected[card.type].push(card.id);
  };

  isOnTable = (card: CardDefinition) => {
    return this[card.type].some((tableCard) => tableCard.id === card.id);
  };
}
