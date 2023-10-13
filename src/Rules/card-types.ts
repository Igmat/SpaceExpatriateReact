import { GameState } from ".";
import type { EffectName } from "./Colony/ColonyManager";

export type ResourcePrimitive =
  | "fuel"
  | "minerals"
  | "biotic materials"
  | "machinery"
  | "nanotechnologies"
  | "dark matter";

export const isResourcePrimitive = (
  option: string
): option is ResourcePrimitive =>
  [
    "fuel",
    "minerals",
    "biotic materials",
    "machinery",
    "nanotechnologies",
    "dark matter",
  ].includes(option);

export const isCardType = (option: string): option is CardType =>
  ["delivery", "engineering", "terraforming", "military"].includes(option);

export type Resource = ResourcePrimitive | ResourcePrimitive[];

export type CardDefinition =
  | DeliveryCard
  | EngineeringCard
  | TerraformingCard
  | MilitaryCard;

export type CardType = "delivery" | "engineering" | "terraforming" | "military";

export interface DeliveryCard {
  id: number;
  type: "delivery";
  resources: /*ResourcePrimitive | */ ResourcePrimitive[];
  // points: number
}

export interface EngineeringCard {
  id: number;
  type: "engineering";
  connection: "start" | "continue" | "end";
  entryPoint?: Resource;
  exitPoint?: Resource[];
  points?: number;
  name: string;
}

export interface TerraformingCard {
  name: string;
  id: number;
  type: "terraforming";
  resources: Resource[];
  points: number;
}

export interface MilitaryCard {
  id: number;
  type: "military";
  weapon: "orbital" | "intelligence" | "fighters" | "spaceborne";
  name: string;
  // points: number
}

export type EffectActivateFn = (gameState: GameState) => void;

export type FullTrigger = {
  activate: EffectActivateFn;
  effects: EffectName[];
};

export type Trigger =
  | EffectName
  | EffectActivateFn
  | EffectName[]
  | FullTrigger;

export interface ColonyCard {
  id: number;
  type: "colony";
  benefit: string;
  mutateAction: CardType;
  data?: unknown;
  players?: number;
  name: string;
  before?: Trigger;
  after?: Trigger;
  during?: Trigger;
}

export const expandTrigger = (trigger?: Trigger): FullTrigger => {
  if (!trigger) {
    return { activate: () => {}, effects: [] };
  }
  if (typeof trigger === "function") {
    return { activate: trigger, effects: [] };
  }
  if (Array.isArray(trigger)) {
    return { activate: () => {}, effects: trigger };
  }
  if (typeof trigger === "string") {
    return { activate: () => {}, effects: [trigger] };
  }
  return trigger;
};
