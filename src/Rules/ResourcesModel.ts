import { makeAutoObservable, autorun } from "mobx";
import {
  EngineeringCard,
  ResourcePrimitive,
  TerraformingCard,
} from "./card-types";
import { TableModel } from "./TableModel";
import { writeToLS, readFromLS } from "../utils";//new

type playerResources = {
  [key in ResourcePrimitive | any]: number;
  //[key: any]: number;
};
export class ResourcesModel {
  // будет разделение на PLayerModel & GarbageModel

  constructor(private readonly table: TableModel) {
    makeAutoObservable(this);
    autorun(() => {
      writeToLS("garbageResources", this.garbageResources);
      writeToLS("playerResources", this.playerResources);
      writeToLS("tempGarbageResources", this.tempGarbageResources);
      writeToLS("charterResource", this.charterResource);
      writeToLS("engineeringMaps", this.engineeringMaps);
      writeToLS("points", this.points);
      writeToLS("energy", this.energy);
    });
  }
  public playerResources: playerResources = readFromLS("playerResources") || {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
    "dark matter": 0,
  };

  public charterResource?: ResourcePrimitive = readFromLS("charterResource");

  public garbageResources: playerResources = readFromLS("garbageResources") || {
    fuel: 0,
    minerals: 0,
    "biotic materials": 0,
    machinery: 0,
    nanotechnologies: 0,
  };

  public tempGarbageResources: playerResources = readFromLS("tempGarbageResources") || {};

  saveGarbage = () => {
    for (let key in this.garbageResources) {
      this.tempGarbageResources[key] = this.garbageResources[key];
    }
  };
  /**********Points************************************************************************** */
  public points = readFromLS("points") || {
    round: 0,
    total: 0,
  };

  public engineeringMaps = readFromLS("engineeringMaps") || {
    Start: {} as { [key: number]: number },
    Middle: {} as { [key: number]: number },
    FinishCounter: 0,
  };

  getResources = () => {
    this.dropResources();
    this.table.delivery.forEach((card) =>
      card.resources.forEach((res) => this.playerResources[res]++)
    );
    for (let key in this.playerResources) {
      if (this.garbageResources.hasOwnProperty(key)) {
        this.playerResources[key] -= this.garbageResources[key];
      }

      if (this.playerResources[key] < 0) this.playerResources[key] = 0;
    }
    this.charterResource && this.playerResources[this.charterResource]++;
    // this.savePlayerResources()//запасной вариант востановления ресурсов при ресете
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
  /*
  savePlayerResources = () => {//запасной вариант востановления ресурсов при ресете
    for (let key in this.playerResources) {
      this.tempPlayerResources[key] = this.playerResources[key];
    }
  };
resetPlayerResources = () => {//запасной вариант востановления ресурсов при ресете
  for (let key in this.tempPlayerResources) {
    this.playerResources[key] = this.tempPlayerResources[key];
  }
}*/
  payForCard = (resources: ResourcePrimitive[]) => {
    resources.forEach((resource) => {
      this.playerResources[resource]--;
    });
  };
  gainResource = (resource: ResourcePrimitive) => {
    this.playerResources[resource]++;
  };
  removeResourcesFromGarbage = (resource: ResourcePrimitive) => {
    this.garbageResources[resource] = 0;
  };

  calculateTotalPoints = () => {
    this.points.total += this.points.round;
  };

  calculateRoundPoints = (card: EngineeringCard | TerraformingCard) => {
    this.points.round += card.points || 0;
  };

  resetPoints = () => {
    this.points.total = 0;
  };
  resetRoundPoints = () => {
    this.points.round = 0;
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

  public energy = readFromLS("energy") || 0;
}
