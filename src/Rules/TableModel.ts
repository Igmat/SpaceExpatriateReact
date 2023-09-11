import { makeAutoObservable } from "mobx";
import {
  CardDefinition,
  CardType,
  DeliveryCard,
  EngineeringCard,
  MilitaryCard,
  TerraformingCard,
} from "./card-types";

export class TableModel {
  constructor() {
    makeAutoObservable(this);
  }

  delivery: DeliveryCard[] = [];
  engineering: EngineeringCard[] = [];
  terraforming: TerraformingCard[] = [];
  military: MilitaryCard[] = [];

  tempDroppedCards: (DeliveryCard//временное хранилище для сброшеных карт
  | EngineeringCard
  | TerraformingCard
  | MilitaryCard)[] = [];

  usedTerraformingCards: TerraformingCard[] = [];//использованные карты Terraforming

  dropCards = (//очистить сброшенные карты со стола
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
/*
  dropCards = (...cards: CardDefinition[]) => {//??
    cards.forEach((card) => {
      this[card.type] = this[card.type].filter(card => !cards.includes(card));
    })
  }*/
  addCardsToTempDrop = (...cards: CardDefinition[]) => {
    this.tempDroppedCards.push(...cards);
    this.dropCards(...cards);
  };

  dropTempCards = () => {
    if ((this.tempDroppedCards.length = 0)) return;
    this.tempDroppedCards = [];
  };

  resetTempDroppedCards = () => {
  //  this.tempDroppedCards.forEach((card) => this[card.type].push(card));//не работает...
    this.tempDroppedCards = []
  };

  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card);
  };
  takeCard = (card: CardDefinition) => {
    this[card.type].push(card as any);
    //  console.log(card)
  };
}
