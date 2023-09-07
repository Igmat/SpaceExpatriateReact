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

  dropCards = (...cards: (DeliveryCard | EngineeringCard | TerraformingCard | MilitaryCard)[]) => {
    this.delivery = this.delivery.filter((card) => !cards.includes(card));
    this.engineering = this.engineering.filter((card) => !cards.includes(card));
    this.terraforming = this.terraforming.filter((card) => !cards.includes(card));
    this.military = this.military.filter((card) => !cards.includes(card));
  } 
  takeCard = (card: CardDefinition) => {
    this[card.type].push(card as any);
  //  console.log(card)
  };
}
