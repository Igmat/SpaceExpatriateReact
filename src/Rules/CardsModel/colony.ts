import { makeAutoObservable } from "mobx";
import { CardType, Trigger } from "../card-types";

/*
export interface ColonyCard {
  id: number;
 type: "colony";
  benefit: string;
  mutateAction: CardType;
  data?: unknown;
  players?: number;
  name: string;
  before?: Trigger;
  after?: Trigger;
  during?: Trigger;
}*/

export interface ColonyCardDefinition {
  benefit: string;
  mutateAction: CardType;
  name: string;
  data?: unknown;
  players?: number;
  before?: Trigger;
  after?: Trigger;
  during?: Trigger;
}

export class ColonyCard {
  public benefit: string;
  public mutateAction: CardType;
  public name: string;
  public after?: Trigger;
  public before?: Trigger;
  public data?: unknown;
  public during?: Trigger;
  public players?: number;
  constructor(public id: number, data: ColonyCardDefinition) {
    this.after = data.after;
    this.before = data.before;
    this.benefit = data.benefit;
    this.data = data.data;
    this.during = data.during;
    this.mutateAction = data.mutateAction;
    this.name = data.name;
    this.players = data.players;
    makeAutoObservable(this);
  }
}
