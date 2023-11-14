import { makeObservable, observable } from "mobx";
import { Resource } from "../card-types";
import { BasicCard } from ".";

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
  extends BasicCard
  implements EngineeringCardDefinition {
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
    makeObservable(this, {
      name: observable,
      connection: observable,
      entryPoint: observable,
      exitPoint: observable,
      points: observable,
    })
    this.name = data.name;
    this.connection = data.connection;
    this.points = data.points;
    this.entryPoint = data.entryPoint;
    this.exitPoint = data.exitPoint;

  }

}