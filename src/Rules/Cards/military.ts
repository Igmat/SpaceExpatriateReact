import { computed, makeAutoObservable, makeObservable, observable } from "mobx";
import { CardsMethods } from ".";
import { DeckManager } from "../DeckManager";
import { HandModel } from "../HandModel";
import { TableModel } from "../TableModel";
/*
export interface MilitaryCard {
  id: number;
  type: "military";
  weapon: "orbital" | "intelligence" | "fighters" | "spaceborne";
  name: string;
  // points: number
}
*/

export type WeaponType = "orbital" | "intelligence" | "fighters" | "spaceborne";

export interface MilitaryCardDefinition {
  name: string;
  weapon: WeaponType;
}

export class MilitaryCard
  extends CardsMethods
  implements MilitaryCardDefinition
{
  //implements
  public readonly type = "military";
  public name: string;
  public weapon: WeaponType;
  constructor(
    public id: number,
    data: MilitaryCardDefinition,

  ) {
    super();
    this.name = data.name;
    this.weapon = data.weapon;

    makeObservable(this, {
      name: observable,
      weapon: observable,
    });
  }

}
