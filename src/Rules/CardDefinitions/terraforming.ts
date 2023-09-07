import { TerraformingCard } from "../card-types";
import { createCards } from "./createCards";

export const terraformingCards = createCards<TerraformingCard>(
  "terraforming",

  {
    name: "Power Station",
    resources: ["fuel", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 2,
  },
  {
    name: "Bulk materials storage",
    resources: ["minerals", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 2,
  },
  {
    name: "Hydroponic greenhouse",
    resources: ["biotic materials", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 2,
  },
  {
    name: "Geospitial data collector",
    resources: ["fuel", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 3,
  },
  {
    name: "Emergency shelter",
    resources: ["minerals", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 3,
  },/*
  {
    name: "Emergency shelter",
    resources: ["minerals", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },*/
  {
    name: "Oxygen generator",
    resources: ["biotic materials", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 3,
  },

  {
    name: "Habitat unit",
    resources: ["fuel", "biotic materials", "minerals"],
    quantity: 2,
    points: 3,
  
  },
  {
    name: "Civil transporter",
    resources: ["fuel", "machinery"],
    quantity: 2,
    points: 3,
  
  },
  {
    name: "Recycling tank",
    resources: ["fuel", "nanotechnologies"],
    quantity: 2,
    points: 3,
  
  },
  {
    name: "Workshop",
    resources: ["minerals", "machinery"],
    quantity: 2,
    points: 3,
 
  },
  {
    name: "Chemical lab",
    resources: ["minerals", "nanotechnologies"],
    quantity: 2,
    points: 3,
  
  },
  {
    name: "Madical bay",
    resources: ["biotic materials", "machinery"],
    quantity: 2,
    points: 3,
  
  },
  {
    name: "BIOENHANCEMENT LAB",
    resources: ["biotic materials", "nanotechnologies"],
    quantity: 2,
    points: 3,
  
  },
  {
    name: "CONSTRUCTION UNIT",
    resources: ["machinery", "machinery"],
    quantity: 2,
    points: 4,
   
  },
  {
    name: "WATER SYNTHESIS LAB",
    resources: ["machinery", "nanotechnologies"],
    quantity: 2,
    points: 4,

  },
  {
    name: "NANOREPLICATOR",
    resources: ["nanotechnologies", "nanotechnologies"],
    quantity: 2,
    points: 4,
   
  }
);
