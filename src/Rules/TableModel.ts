import { makeAutoObservable } from "mobx";
import {
  CardDefinition,
  DeliveryCard,
  EngineeringCard,
  MilitaryCard,
  TerraformingCard,
} from "./card-types";
import { makeAutoSavable } from "../Utils/makeAutoSavable";

export class TableModel {
  constructor(gameId: string) {
    makeAutoObservable(this);
    makeAutoSavable(this, gameId, "table",[
      "delivery",
      "engineering",
      "terraforming",
      "military",
 
    ]);
  }

  delivery: DeliveryCard[] = [];
  engineering: EngineeringCard[] = [];
  terraforming: TerraformingCard[] = [];
  military: MilitaryCard[] = [];


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

  takeCard = (card: CardDefinition) => {
    this[card.type].push(card as any);
    //  console.log(card)
  };
}
