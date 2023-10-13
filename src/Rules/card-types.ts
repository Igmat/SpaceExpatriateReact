import { GameState } from ".";

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
export type ColonyCardEffect =
  | "selectDeliveryStation"
  | "adjustGarbage"
  | "tempEngineering"
  | "tempEngineeringRemove"
  | "addPointsFromColonies"
export interface ColonyCard {
  id: number;
  type: "colony";
  benefit: string;
  whenIsActivated: "before" | "after" | "during";
  mutateAction: CardType; //или тут будет функция будет мутировать экшены,
  players?: number;
  name: string;
  // activate?: (gameState: GameState) => void;
  // effects?: ColonyCardEffect[];

  before?: {
    activate?: (gameState: GameState) => void;
    effects?: ColonyCardEffect[];
  };
  after?: {
    activate?: (gameState: GameState) => void;
    effects?: ColonyCardEffect[];
  };
  during?: {
    activate?: (gameState: GameState) => void;
    effects?: ColonyCardEffect[];
  };
}
