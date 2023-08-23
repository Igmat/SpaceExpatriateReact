import { TerraformingCard } from "../card-types";
import { createCards } from "./createCards";

export const terraformingCards = createCards<TerraformingCard>(
  "terraforming",

  {
    name: "Power Station",
    resources: ["fuel", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },
  {
    name: "Bulk materials storage",
    resources: ["minerals", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },
  {
    name: "Hydroponic greenhouse",
    resources: ["biotic materials", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },
  {
    name: "Geospitial data collector",
    resources: ["fuel", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },
  {
    name: "Emergency shelter",
    resources: ["minerals", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },
  {
    name: "Emergency shelter",
    resources: ["minerals", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },
  {
    name: "Oxygen generator",
    resources: ["biotic materials", ["fuel", "biotic materials", "minerals"]],
    quantity: 2,
    points: 0,
  },

  {
    name: "Habitat unit",
    resources: ["fuel", "biotic materials", "minerals"],
    points: 1,
    quantity: 2,
  },
  {
    name: "Civil transporter",
    resources: ["fuel", "machinery"],
    points: 1,
    quantity: 2,
  },
  {
    name: "Recycling tank",
    resources: ["fuel", "nanotechnologies"],
    points: 1,
    quantity: 2,
  },
  {
    name: "Workshop ",
    resources: ["minerals", "machinery"],
    points: 1,
    quantity: 2,
  },
  {
    name: "Chemical lab",
    resources: ["minerals", "nanotechnologies"],
    points: 1,
    quantity: 2,
  },
  {
    name: "Madical bay",
    resources: ["biotic materials", "machinery"],
    points: 1,
    quantity: 2,
  },
  {
    name: "BIOENHANCEMENT LAB",
    resources: ["biotic materials", "nanotechnologies"],
    points: 1,
    quantity: 2,
  },
  {
    name: "CONSTRUCTION UNIT",
    resources: ["machinery", "machinery"],
    points: 1,
    quantity: 2,
  },
  {
    name: "WATER SYNTHESIS LAB",
    resources: ["machinery", "nanotechnologies"],
    points: 1,
    quantity: 2,
  },
  {
    name: "NANOREPLICATOR",
    resources: ["nanotechnologies", "nanotechnologies"],
    points: 1,
    quantity: 2,
  }
);
