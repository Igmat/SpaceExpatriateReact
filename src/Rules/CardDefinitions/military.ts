import { MilitaryCard } from "../card-types";
import { createCards } from "./createCards";

export const militaryCards = createCards<MilitaryCard>(
  "military",
  /*...Array(8).fill({ weapon: "fighters" }),
  ...Array(8).fill({ weapon: "intelligence" }),
  ...Array(8).fill({ weapon: "spaceborne" }),
  ...Array(8).fill({ weapon: "orbital" })*/
  { weapon: "fighters", quantity:8},
  { weapon: "spaceborne", quantity:8},
  { weapon: "orbital", quantity:8},
  { weapon: "intelligence", quantity:8},
);
