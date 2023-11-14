import { makeObservable, observable } from "mobx";
import { BasicCard } from ".";

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
  extends BasicCard
  implements MilitaryCardDefinition {
  public readonly type = "military";
  public name: string;
  public weapon: WeaponType;
  constructor(
    public id: number,
    data: MilitaryCardDefinition,

  ) {
    super();
    makeObservable(this, {
      name: observable,
      weapon: observable,
    })
    this.name = data.name;
    this.weapon = data.weapon;

  }

}