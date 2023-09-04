import { makeAutoObservable } from "mobx";
import { CardDefinition, DeliveryCard, EngineeringCard, MilitaryCard, TerraformingCard } from "./card-types";

export class TableModel {
  constructor() {
    makeAutoObservable(this);
  }

  delivery:DeliveryCard[] = [];
  engineering:EngineeringCard[] = [];
  terraforming: TerraformingCard[] = [];
  military: MilitaryCard[] = [];

  dropCards = (...cards: (DeliveryCard | EngineeringCard | TerraformingCard | MilitaryCard)[]) => {
      
    } //
    takeCard = (card:CardDefinition)=>{this[card.type].push(card as any)} 
}
