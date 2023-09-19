import { makeAutoObservable, autorun } from "mobx";
import {
  CardDefinition,
  DeliveryCard,
  EngineeringCard,
  MilitaryCard,
  TerraformingCard,
} from "./card-types";
import localStorage from "mobx-localstorage";
export class TableModel {
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      localStorage.setItem("tableDelivery", this.delivery);
      localStorage.setItem("tableEngineering", this.engineering);
      localStorage.setItem("tableTerraforming", this.terraforming);
      localStorage.setItem("tableMilitary", this.military);
    });
  }

  delivery: DeliveryCard[] = localStorage.getItem("tableDelivery") || [];
  engineering: EngineeringCard[] =
    localStorage.getItem("tableEngineering") || [];
  terraforming: TerraformingCard[] =
    localStorage.getItem("tableTerraforming") || [];
  military: MilitaryCard[] = localStorage.getItem("tableMilitary") || [];

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
    //  console.log(card)
  };
}
