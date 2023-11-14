import { GameState } from ".";
import type { EffectName } from "./Colony/ColonyManager";
import { DeliveryCard, DeliveryCardDefinition } from "./Cards/delivery";
import { MilitaryCard, MilitaryCardDefinition } from "./Cards/military";
import { EngineeringCard, EngineeringCardDefinition } from "./Cards/engineering";
import { TerraformingCard, TerraformingCardDefinition } from "./Cards/terraforming";
import { ColonyCard, ColonyCardDefinition } from "./Cards/colony";
export const BasicResources = [
  "fuel",
  "minerals",
  "biotic materials",
  "machinery",
  "nanotechnologies",
] as const;

export const ResourcePrimitives = [
  ...BasicResources,
  "dark matter",
] as const;

export type BasicResource = (typeof BasicResources)[number];

export type ResourcePrimitive = (typeof ResourcePrimitives)[number];

export type Resource = ResourcePrimitive | ResourcePrimitive[];

/* эти методы больше нигде не используются

export const isResourcePrimitive = (option: string):option is ResourcePrimitive => 
  ResourcePrimitives.includes(option as any);

export const isCardType = (option: string): option is CardType =>
  ["delivery", "engineering", "terraforming", "military"].includes(option);

*/

export type GeneralCard =
  | DeliveryCard
  | EngineeringCard
  | TerraformingCard
  | MilitaryCard

export type CardDefinition =
  | DeliveryCardDefinition
  | EngineeringCardDefinition
  | MilitaryCardDefinition
  | TerraformingCardDefinition
  | ColonyCardDefinition

export const CardTypes = ["delivery", "engineering", "terraforming", "military"] as const;
export type CardType = (typeof CardTypes)[number];

export const isEngineeringCard = (
  
  value: unknown
): value is EngineeringCard => {
  return (
    typeof value === "object" &&
    !!value &&
    // "isSelected" in value &&
    "id" in value &&
    "type" in value &&
    value.type === "engineering" &&
    "connection" in value &&
    "name" in value
  );
};

export interface CardId {
  id: number;
  type: CardType;
}

export type SelectableEngineeringCard = EngineeringCard & {
  isSelected: boolean;
};

export type EffectActivateFn = (gameState: GameState) => Promise<unknown>;

export type FullTrigger = {
  activate: EffectActivateFn;
  effects: EffectName[];
};

export type Trigger =
  | EffectName
  | EffectActivateFn
  | EffectName[]
  | FullTrigger;

export const TriggerNames = ["before", "after", "during", "beforeSelect", "afterSelect", "afterPerform"] as const;

export type TriggerName = (typeof TriggerNames)[number]

export const expandTrigger = (trigger?: Trigger): FullTrigger => {
  if (!trigger) {
    return { activate: async () => { }, effects: [] };
  }
  if (typeof trigger === "function") {
    return { activate: trigger, effects: [] };
  }
  if (Array.isArray(trigger)) {
    return { activate: async () => { }, effects: trigger };
  }
  if (typeof trigger === "string") {
    return { activate: async () => { }, effects: [trigger] };
  }
  return trigger;
};
