import { makeObservable, observable } from "mobx";
import { BasicResource, ResourcePrimitive } from "../card-types";
import { CardsMethods } from ".";


/*
export interface DeliveryCard {
  id: number;
  type: "delivery";
  resources: ResourcePrimitive[];
}
*/
export interface DeliveryCardDefinition {
  resources: BasicResource[];
}
export class DeliveryCard
  extends CardsMethods
  implements DeliveryCardDefinition
{
  public readonly type = "delivery";
  public resources: BasicResource[];
  constructor(public id: number, data: DeliveryCardDefinition) {
    super();
    makeObservable(this, {
      resources: observable,
    });
    this.resources = data.resources;
  }
}