import { computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { Resource } from "../card-types";
import { CardsMethods } from ".";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { TableModel } from "../TableModel";

/*
export interface EngineeringCard {
  id: number;
  type: "engineering";
  connection: "start" | "continue" | "end";
  entryPoint?: Resource;
  exitPoint?: Resource[];
  points?: number;
  name: string;
}
*/

export type ConectionType = "start" | "continue" | "end";

export interface EngineeringCardDefinition {
  name: string;
  connection: ConectionType;
  points?: number;
  entryPoint?: Resource;
  exitPoint?: Resource[];
}
export class EngineeringCard
  extends CardsMethods
  implements EngineeringCardDefinition
{
  public readonly type = "engineering";
  public name: string;
  public connection: ConectionType;
  public entryPoint?: Resource;
  public exitPoint?: Resource[];
  public points?: number;
  constructor(
    public id: number,
    data: EngineeringCardDefinition,
  ) {
    super();

    this.name = data.name;
    this.connection = data.connection;
    this.points = data.points;
    this.entryPoint = data.entryPoint;
    this.exitPoint = data.exitPoint;

    makeObservable(this, {
      name: observable,
      connection: observable,
      entryPoint: observable,
      exitPoint: observable,
      points: observable,

    });
  }
}
