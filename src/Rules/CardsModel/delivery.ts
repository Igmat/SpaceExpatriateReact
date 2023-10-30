import { makeAutoObservable } from "mobx";
import { ResourcePrimitive } from "../card-types";

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
export class DeliveryCard implements DeliveryCardDefinition {
  public readonly type = "delivery";
  public resources: ResourcePrimitive[];
  constructor(public id: number, data: DeliveryCardDefinition) {
    this.resources = data.resources;
    makeAutoObservable(this);
  }
}
