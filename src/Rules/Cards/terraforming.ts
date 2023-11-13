import { makeObservable, observable } from "mobx";
import { Resource } from "../card-types";
import { CardsMethods } from ".";

/*
export interface TerraformingCard {
  name: string;
  id: number;
  type: "terraforming";
  resources: Resource[];
  points: number;
}*/
export interface TerraformingCardDefinition {
  name: string;
  resources: Resource[];
  points: number;
}
export class TerraformingCard
  extends CardsMethods
  implements TerraformingCardDefinition
{
  public readonly type = "terraforming";
  public name: string;
  public resources: Resource[];
  public points: number;
  constructor(public id: number, data: TerraformingCardDefinition) {
    super();
    makeObservable(this, {
      name: observable,
      resources: observable,
      points: observable,
    });
    this.name = data.name;
    this.resources = data.resources;
    this.points = data.points;
  }
}
