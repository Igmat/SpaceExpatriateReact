import { makeAutoObservable } from "mobx";
import { GeneralCard, SelectableEngineeringCard } from "./card-types";
import { DeliveryCard } from "./Cards/delivery";
import { EngineeringCard } from "./Cards/engineering";
import { MilitaryCard } from "./Cards/military";
import { TerraformingCard } from "./Cards/terraforming";
import { ICardPlace } from "./Cards/ICardPlace";

export class TableModel implements ICardPlace {
  constructor(gameId: string) {
    makeAutoObservable(this);
  }

  delivery: (DeliveryCard & { isSelected: boolean })[] = [];
  engineering: SelectableEngineeringCard[] = [];
  terraforming: (TerraformingCard & { isSelected: boolean })[] = [];
  military: (MilitaryCard & { isSelected: boolean })[] = [];

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

  takeCard = (card: GeneralCard) => {
    console.log(card);
    this[card.type].push(card as any);
    
    return card;
  };
  placeCard(card: GeneralCard): GeneralCard {
    this[card.type].push(card as any);
    return card;
  }

  resetSelectedFlags = () => {
    this.delivery.forEach((card) => (card.isSelected = false));
    this.engineering.forEach((card) => (card.isSelected = false));
    this.terraforming.forEach((card) => (card.isSelected = false));
    this.military.forEach((card) => (card.isSelected = false));
  };

  toggleSelectedFlag = (card: GeneralCard) => {
    this[card.type].forEach((el) => {
      if (el.id === card.id) {
        el.isSelected = !el.isSelected;
      }
    });
  };

  isOnTable = (card: GeneralCard) => {
    return this[card.type].some((tableCard) => tableCard.id === card.id);
  };
}
