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

  tempDroppedCards: CardDefinition[] = [];

  usedTerraformingCards: TerraformingCard[] = [];

  dropCards = (
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
  };
  tempDropCards = (...cards: CardDefinition[]) => {
    this.tempDroppedCards.push(...cards)
  };
  dropTempCards = () => {
    if ((this.tempDroppedCards.length = 0)) return;
    this.dropCards(...this.tempDroppedCards);
    this.tempDroppedCards = [];
  };
 
  useTerraformingCard = (card: TerraformingCard) => {
    this.usedTerraformingCards.push(card);
  };
  takeCard = (card: CardDefinition) => {
    this[card.type].push(card as any);
    //  console.log(card)
  };
}
