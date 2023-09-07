import { makeAutoObservable } from "mobx";
import {
  CardDefinition,
  EngineeringCard,
  Resource,
  ResourcePrimitive,
  TerraformingCard,
} from "./card-types";
import { HandModel } from "./HandModel";
import { TableModel } from "./TableModel";

type playerResources = {
  [key in ResourcePrimitive | any]: number;
  //[key: any]: number;
};

export class ResourcesModel {
  // будет разделение на PLayerModel & GarbageModel
  public playerResources: playerResources = {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };
  public points = {
    round: 0,
    total: 0,
  };
  public energy = {
    startEnergy: 0,
    energy: 0,
  };

  public garbageResources: playerResources = {
    fuel: 2,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };
  constructor(private readonly table: TableModel) {
    makeAutoObservable(this);
  }

  getResources = (resource: ResourcePrimitive) => {
    this.playerResources[resource]++;
    this.table.delivery.map((card) =>
      card.resources.forEach((res) => this.playerResources[res]++)
    );
    for (let key in this.playerResources) {
      this.playerResources[key] =
        this.playerResources[key] - this.garbageResources[key];
      if (this.playerResources[key] < 0) this.playerResources[key] = 0;
    }
  };
  fillGarbege = () => {
    //переписать (очистить и добавить ресурсы)
    for (let key in this.garbageResources) {
      this.garbageResources[key] += this.playerResources[key];
    }
  };
  dropResources = () => {
    this.fillGarbege();
    for (let key in this.playerResources) {
      this.playerResources[key] = 0;
    }
  };

  fillCard = (resources: ResourcePrimitive[]) => {
    resources.map((resource) => this.playerResources[resource]--);
  };
  currentTotalPoints = (points: number) => {
    this.points.total += points;
    console.log(points);
  };

  currentRoundPoints = (cards: EngineeringCard | TerraformingCard) => {};

  currentEnergy = () => {};

  removeResourcesFromGarbage = (resource: ResourcePrimitive) => {
    this.garbageResources[resource] = 0;
    // console.log(this.garbageResources);
  };
  ///engeniringFunk

  public engineeringMaps = {
    StartMap: {},
    MiddleMap:  {},
    FinishCounter: 0,
  };

  createEngineeringMap = (cards: EngineeringCard[]) => {//test is in DeliveryActionWindow
    if (cards.length === 0) return;
    const startArr: EngineeringCard [] = [];
    const continueArr: EngineeringCard [] = [];

    cards.forEach((card) => {
      if (card.connection === "start") startArr.push(card);
      if (card.connection === "continue") continueArr.push(card);
      if (card.connection === "end") this.engineeringMaps.FinishCounter++;
    });
    this.engineeringMaps.StartMap = startArr.reduce(
      (acc, card) => (acc[card.id] = 1) && acc,
      {} as { [key: number]: number}
    );
    this.engineeringMaps.MiddleMap = continueArr.reduce(
      (acc, card) => (acc[card.id] = 2) && acc,
      {} as { [key: number]: number}
    );
  };

  /*
  countPoints = (arg: number[]) => {
    this.points.total = arg.reduce((acc, el) => acc + el, this.points.total);
  };*/
}
