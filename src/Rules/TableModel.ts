import { makeAutoObservable } from "mobx";
import {
  CardDefinition,
  ColonyCard,
  DeliveryCard,
  EngineeringCard,
  MilitaryCard,
  TerraformingCard,
} from "./card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";

export class TableModel {
  constructor(gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "table", [
      "delivery",
      "engineering",
      "terraforming",
      "military",
      "colony",
    ]);
  }

  delivery: (DeliveryCard & { isSelected: boolean })[] = [];
  engineering: (EngineeringCard & { isSelected: boolean })[] = [];
  terraforming: (TerraformingCard & { isSelected: boolean })[] = [];
  military: (MilitaryCard & { isSelected: boolean })[] = [];
  colony: ColonyCard[] = [];

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
  takeColonyCard = (card: ColonyCard) => {
    this.colony.push(card);
  };

  resetSelectedFlags = () => {
    this.delivery.forEach((card) => (card.isSelected = false));
    this.engineering.forEach((card) => (card.isSelected = false));
    this.terraforming.forEach((card) => (card.isSelected = false));
    this.military.forEach((card) => (card.isSelected = false));
  };

  setSelectedFlagTrue = (card:CardDefinition) => {
    this[card.type].forEach((el) => {
      if (el.id === card.id) {
        el.isSelected = true;
      }
    });
  };

  setSelectedFlagFalse = (card: CardDefinition) => {
    this[card.type].forEach((el) => {
      if (el.id === card.id) {
        el.isSelected = false;
      }
    });
  }
}
