import { makeAutoObservable } from "mobx";
import { Resource } from "../card-types";

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
export class TerraformingCard {
  public readonly type = "terraforming";
  public name: string;
  public resources: Resource[];
  public points: number;
  constructor(public id: number, data: TerraformingCardDefinition) {
    this.name = data.name;
    this.resources = data.resources;
    this.points = data.points;
    makeAutoObservable(this);
  }
}
