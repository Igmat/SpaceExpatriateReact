import { makeAutoObservable } from "mobx";
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

export class MilitaryCard {
  public readonly type = "military";
  public name: string;
  public weapon: WeaponType;
  constructor(public id: number, data: MilitaryCardDefinition) {
    this.name = data.name;
    this.weapon = data.weapon;
    makeAutoObservable(this);
  }
}
