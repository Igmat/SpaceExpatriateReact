import { computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { ResourcePrimitive } from "../card-types";
import { CardsMethods } from ".";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { TableModel } from "../TableModel";
import { ICardPlace } from "./ICardPlace";

/*
export interface DeliveryCard {
  id: number;
  type: "delivery";
  resources: ResourcePrimitive[];
}
*/
export interface DeliveryCardDefinition {
  resources: ResourcePrimitive[];
}
export class DeliveryCard
  extends CardsMethods
  implements DeliveryCardDefinition
{
  public readonly type = "delivery";
  public resources: ResourcePrimitive[];
  constructor(public id: number, data: DeliveryCardDefinition) {
    super();
   /* makeObservable(this, {
      resources: observable,
    });*/
    this.resources = data.resources;
  }
}
