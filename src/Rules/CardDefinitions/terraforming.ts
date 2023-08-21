
import { TerraformingCard } from "../card-types";
import { createCards } from "./createCards";

export const terraformingCards = createCards<TerraformingCard>(
  "terraforming",
  /*
  { resources: ["fuel", ["fuel", "biotic materials", "minerals"]], quantity: 2 },// Power Station - 2
   { resources: ["minerals", ["fuel", "biotic materials", "minerals"]], quantity: 2 },// Bulk materials storage - 2
 { resources: ["biotic materials", ["fuel", "biotic materials", "minerals"]], quantity: 2 },// Hydroponic greenhouse - 2
     { resources: [fuel", "["fuel", "biotic materials", "minerals"]], quantity: 2 }, //Geospitial data collector - 2
    { resources: ["minerals", ["fuel", "biotic materials", "minerals"]], quantity: 2 }, //Emergency shelter - 2
    { resources: ["minerals", ["fuel", "biotic materials", "minerals"]], quantity: 2 },// Emergency shelter - 2
    { resources: ["biotic materials",["fuel", "biotic materials", "minerals"]], quantity: 2  }, //Oxygen generator - 2
    */
  { resources: ["fuel", "biotic materials", "minerals"], points: 1,  quantity: 2}, //Habitat unit - 2
  { resources: ["fuel", "machinery"], points: 1,  quantity: 2 }, //Civil transporter - 2
  { resources: ["fuel", "nanotechnologies"] , points: 1, quantity: 2}, //Recycling tank - 2
  { resources: ["minerals", "machinery"],points: 1,  quantity: 2 }, //Workshop - 2
  { resources: ["minerals", "nanotechnologies"], points: 1, quantity: 2 },//Chemical lab - 2
  { resources: ["biotic materials", "machinery"], points: 1, quantity: 2 },//Madical bay - 2
  { resources: ["biotic materials", "nanotechnologies"], points: 1, quantity: 2 },//BIOENHANCEMENT LAB - 2
  { resources: ["machinery", "machinery"],points: 1,  quantity: 2 },//CONSTRUCTION UNIT - 2
  { resources: ["machinery", "nanotechnologies"] ,points: 1,  quantity: 2},//WATER SYNTHESIS LAB - 2
  { resources: ["nanotechnologies", "nanotechnologies"] , points: 1, quantity: 2} //NANOREPLICATOR - 2
);
/*
export const militaryCards = createCards<MilitaryCard>(
  "military",
  ...Array(8).fill({ weapon: "fighters" }),
  ...Array(8).fill({ weapon: "intelligence" }),
  ...Array(8).fill({ weapon: "spaceborne" }),
  ...Array(8).fill({ weapon: "orbital" })
);
*/
