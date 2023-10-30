import { MilitaryCard } from "../CardsModel/military";
import { createCards } from "./createCards";

export const militaryCards = createCards(
  MilitaryCard,
  { weapon: "fighters", quantity: 8, name: "Fighters" },
  { weapon: "spaceborne", quantity: 8, name: "Spaceborne" },
  { weapon: "orbital", quantity: 8, name: "Orbital" },
  { weapon: "intelligence", quantity: 8, name: "Intelligence" }
);
