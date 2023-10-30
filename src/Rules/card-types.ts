import { GameState } from ".";
import type { EffectName } from "./Colony/ColonyManager";
import { DeliveryCard} from "./CardsModel/delivery";
import { MilitaryCard} from "./CardsModel/military";
import { EngineeringCard } from "./CardsModel/engineering";
import { TerraformingCard } from "./CardsModel/terraforming";

const ResourceTypes = [
  "fuel",
  "minerals",
  "biotic materials",
  "machinery",
  "nanotechnologies",
  "dark matter",
] as const;

export type ResourcePrimitive = (typeof ResourceTypes)[number];

export const isResourcePrimitive = (option: string): option is ResourcePrimitive => 
ResourceTypes.includes(option as any);

export const isCardType = (option: string): option is CardType =>
  ["delivery", "engineering", "terraforming", "military"].includes(option);

export const isSelectableEngineeringCard = (
  value: unknown
): value is SelectableEngineeringCard => {
  return (
    typeof value === "object" &&
    !!value &&
    "isSelected" in value &&
    "id" in value &&
    "type" in value &&
    value.type === "engineering" &&
    "connection" in value &&
    "name" in value
  );
};

export type Resource = ResourcePrimitive | ResourcePrimitive[];

export type CardDefinition =//Card?  CardDefinition union от чистых данных DeliveryCardDefinition  ...
  | DeliveryCard
  | EngineeringCard
  | TerraformingCard
  | MilitaryCard

/*
export type Cards =
  | DeliveryCard
  | EngineeringCard
  | TerraformingCard
  | MilitaryCard
  | ColonyCard

  export type CardDefinition =
  | DeliveryCardDefinition 
  | EngineeringCardDefinition 
  | MilitaryCardDefinition
  | TerraformingCardDefinition
  | ColonyCardDefinition 
*/

export type CardType = "delivery" | "engineering" | "terraforming" | "military";


export type SelectableEngineeringCard = EngineeringCard & {
  isSelected: boolean;
};


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
