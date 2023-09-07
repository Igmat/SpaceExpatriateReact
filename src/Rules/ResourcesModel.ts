import { makeAutoObservable } from "mobx";
import { Resource, ResourcePrimitive } from "./card-types";
import { HandModel } from "./HandModel";
import { TableModel } from "./TableModel";

type playerResources = {
  [key in ResourcePrimitive | any]: number;
  //[key: any]: number;
};

export class ResourcesModel {
  // PLayerModel & GarbageModal
  public playerResources: playerResources = {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };
  public points = {
    total: 0,
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
  fillGarbege = () => {//переписать (очистить и добавить ресурсы)
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
  toGetPoints = (points: number) => {
    this.points.total += points;
    console.log(points);
  };

  removeResourcesFromGarbage = (resource: ResourcePrimitive) => {
    this.garbageResources[resource] = 0;
    console.log(this.garbageResources);
  };
  /*
  countPoints = (arg: number[]) => {
    this.points.total = arg.reduce((acc, el) => acc + el, this.points.total);
  };*/
}
