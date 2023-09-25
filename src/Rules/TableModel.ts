import { autorun, makeAutoObservable } from "mobx";
import {
  CardDefinition,
  DeliveryCard,
  EngineeringCard,
  MilitaryCard,
  TerraformingCard,
} from "./card-types";
import { writeToLS, readFromLS } from "../utils";
export class TableModel {
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      writeToLS("tableDelivery", this.delivery);
      writeToLS("tableEngineering", this.engineering);
      writeToLS("tableTerraforming", this.terraforming);
      writeToLS("tableMilitary", this.military);
    });
  }

  delivery: DeliveryCard[] = readFromLS ("tableDelivery", []);
  engineering: EngineeringCard[] =
    readFromLS ("tableEngineering", []);
  terraforming: TerraformingCard[] =
    readFromLS ("tableTerraforming", []);
  military: MilitaryCard[] = readFromLS ("tableMilitary", []);


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
