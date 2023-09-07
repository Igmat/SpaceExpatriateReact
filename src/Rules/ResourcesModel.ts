import { makeAutoObservable } from "mobx";
import {
  EngineeringCard,
  ResourcePrimitive,
  TerraformingCard,
} from "./card-types";
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
    for (let key in this.garbageResources) {
      this.garbageResources[key] = this.playerResources[key];
    }
  };
  dropResources = () => {
    for (let key in this.playerResources) {
      this.playerResources[key] = 0;
    }
  };

  fillCard = (resources: ResourcePrimitive[]) => {
    resources.map((resource) => this.playerResources[resource]--);
  };

  removeResourcesFromGarbage = (resource: ResourcePrimitive) => {
    this.garbageResources[resource] = 0;
  };

  /**********Points************************************************************************** */
  public points = {
    round: 0,
    total: 0,
  };

  currentTotalPoints = () => {
    this.points.total += this.points.round;
  };
  //currentRoundPoints = (cards: any[]) => {/test is in DeliveryActionWindow
  currentRoundPoints = (cards: EngineeringCard[] | TerraformingCard[]) => {
    let count = 0;
    cards.map((card) => {
      if (Object.keys(card).includes("points") && card.points !== undefined) {
        count += card.points;
      }
    });
    this.points.round = count;
  };

  /***engineeringMaps****************************************************************** */
  public engineeringMaps = {
    StartMap: {},
    MiddleMap: {},
    FinishCounter: 0,
  };

  //createEngineeringMap = (cards: any[]) => {//test is in DeliveryActionWindow
  createEngineeringMap = (cards: EngineeringCard[]) => {
    if (cards.length === 0) return;
    const startArr: EngineeringCard[] = [];
    const continueArr: EngineeringCard[] = [];

    cards.forEach((card) => {
      if (card.connection === "start") startArr.push(card);
      if (card.connection === "continue") continueArr.push(card);
      if (card.connection === "end") this.engineeringMaps.FinishCounter++;
    });
    this.engineeringMaps.StartMap = startArr.reduce(
      (acc, card) => (acc[card.id] = 1) && acc,
      {} as { [key: number]: number }
    );
    this.engineeringMaps.MiddleMap = continueArr.reduce(
      (acc, card) => (acc[card.id] = 2) && acc,
      {} as { [key: number]: number }
    );
  };

  /****Energy*************************************************************************** */

  public energy = {
    startEnergy: 0,
    energy: 0,
  };

  currentStartEnergy = () => {
    this.energy.startEnergy = Object.values(
      this.engineeringMaps.StartMap as { [key: number]: number }
    ).reduce((acc, el) => acc + el, 0);
  };

  /*
  countPoints = (arg: number[]) => {
    this.points.total = arg.reduce((acc, el) => acc + el, this.points.total);
  };*/
}
