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

  public charterResource?: ResourcePrimitive;

  public garbageResources: playerResources = {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };

  public tempGarbageResources: playerResources = {};

  resetGarbage = () => {
    for (let key in this.tempGarbageResources) {
      this.garbageResources[key] = this.tempGarbageResources[key];
    }
  };
  saveGarbage = () => {
    for (let key in this.garbageResources) {
      this.tempGarbageResources[key] = this.garbageResources[key];
    }
  };
  /**********Points************************************************************************** */
  public points = {
    round: 0,
    total: 0,
  };

  public engineeringMaps = {
    Start: {} as { [key: number]: number },
    Middle: {} as { [key: number]: number },
    FinishCounter: 0,
  };

  constructor(private readonly table: TableModel) {
    makeAutoObservable(this);
  }

  getResources = () => {
    if (this.table.delivery.length === 0) return;
    this.table.delivery.forEach((card) =>
      card.resources.forEach((res) => this.playerResources[res]++)
    );
    for (let key in this.playerResources) {
      this.playerResources[key] -= this.garbageResources[key];
      if (this.playerResources[key] < 0) this.playerResources[key] = 0;
    }
    this.charterResource && this.playerResources[this.charterResource]++;
  };

  addResource = (resource: ResourcePrimitive) => {
    this.charterResource = resource;
  };

  dropToGarbage = () => {
    for (let key in this.garbageResources) {
      this.garbageResources[key] = this.playerResources[key];
    }
    this.saveGarbage(); //сохранение состояния гаража в момент перехода на следующий раунд
  };
  dropResources = () => {
    for (let key in this.playerResources) {
      this.playerResources[key] = 0;
    }
  };

  payForCard = (resources: ResourcePrimitive[]) => {
    resources.forEach((resource) => {
      this.playerResources[resource]--;
    });
  };

  removeResourcesFromGarbage = (resource: ResourcePrimitive) => {
    this.garbageResources[resource] = 0;
  };

  calculateTotalPoints = () => {
    this.points.total += this.points.round;
  };
  //currentRoundPoints = (cards: any[]) => {/test is in DeliveryActionWindow
  calculateRoundPoints = (cards: EngineeringCard[] | TerraformingCard[]) => {
    let count = 0;
    cards.forEach((card) => {
      if (Object.keys(card).includes("points") && card.points !== undefined) {
        count += card.points;
      }
    });
    this.points.round = count;
  };

  resetPoints = () => {
    this.points.total = 0;
  };

  //createEngineeringMap = (cards: any[]) => {//test is in DeliveryActionWindow
  createEngineeringMaps = (cards: EngineeringCard[]) => {
    if (cards.length === 0) return;
    const startArr: EngineeringCard[] = [];
    const continueArr: EngineeringCard[] = [];

    cards.forEach((card) => {
      if (card.connection === "start") startArr.push(card);
      if (card.connection === "continue") continueArr.push(card);
    });
    this.engineeringMaps.Start = startArr.reduce(
      (acc, card) => (acc[card.id] = 1) && acc,
      {} as { [key: number]: number }
    );
    this.engineeringMaps.Middle = continueArr.reduce(
      (acc, card) => (acc[card.id] = 0) || acc,
      {} as { [key: number]: number }
    );

    console.log(this.engineeringMaps.Start);
    console.log(this.engineeringMaps);
  };

  /****Energy*************************************************************************** */

  public energy = {
    startEnergy: 0,
    energy: 0,
  };

  calculateStartEnergy = () => {
    this.energy.startEnergy = Object.values(
      this.engineeringMaps.Start as { [key: number]: number }
    ).reduce((acc, el) => acc + el, 0);
  };
  resetEnergy = () => {
    this.energy.energy = 0;
    this.calculateStartEnergy();
  };
}
