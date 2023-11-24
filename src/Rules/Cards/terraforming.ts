import { makeObservable, observable } from "mobx";
import { Resource } from "../card-types";
import { BasicCard } from ".";

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
  extends BasicCard
  implements TerraformingCardDefinition {
  public readonly type = "terraforming";
  public name: string;
  public resources: Resource[];
  public points: number;
  constructor(id: number, data: TerraformingCardDefinition) {
    super(id);
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
