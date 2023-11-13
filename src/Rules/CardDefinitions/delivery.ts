import { DeliveryCard } from "../Cards/delivery";
import { createCards } from "./createCards";

export const deliveryCards = createCards(
  DeliveryCard,
  { resources: ["fuel", "fuel"], quantity: 4 },
  { resources: ["fuel", "minerals"], quantity: 4 },
  { resources: ["fuel", "biotic materials"], quantity: 4 },
  { resources: ["minerals", "minerals"], quantity: 4 },
  { resources: ["minerals", "biotic materials"], quantity: 4 },
  { resources: ["biotic materials", "biotic materials"], quantity: 4 },
  { resources: ["machinery"], quantity: 4 },
  { resources: ["nanotechnologies"], quantity: 4 }
);

