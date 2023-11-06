import { computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { Resource } from "../card-types";
import { CardsMethods } from ".";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { TableModel } from "../TableModel";

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
  //implements
  public readonly type = "terraforming";
  public name: string;
  public resources: Resource[];
  public points: number;
  constructor(public id: number, data: TerraformingCardDefinition) {
    super();

    this.name = data.name;
    this.resources = data.resources;
    this.points = data.points;

    makeObservable(this, {
      name: observable,
      resources: observable,
      points: observable,
    });
  }
}
