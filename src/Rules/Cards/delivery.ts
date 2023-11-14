import { makeObservable, observable } from "mobx";
import { BasicResource } from "../card-types";
import { BasicCard } from ".";

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
  extends BasicCard
  implements DeliveryCardDefinition {
  public readonly type = "delivery";
  public resources: BasicResource[];
  constructor(id: number, data: DeliveryCardDefinition) {
    super(id);
    makeObservable(this, {
      resources: observable,
    });
    this.resources = data.resources;
  }
}