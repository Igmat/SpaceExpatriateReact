export type ResourcePrimitive = 'fuel' | 'minerals' | 'biotic materials' | 'machinery' | 'nanotechnologies' | 'dark matter';

export type Resource = ResourcePrimitive | ResourcePrimitive[];

export type CardDefinition = DeliveryCard | EngineeringCard | TerraformingCard | MilitaryCard;

export type CardType = 'delivery' | 'engineering' | 'terraforming' | 'military'

export interface DeliveryCard {
    id: number,
    type: 'delivery',
    resources: /*ResourcePrimitive | */ResourcePrimitive[],
}

export interface EngineeringCard {
    id: number,
    type: 'engineering',
    connection: 'start' | 'continue' | 'end',
    entryPoint?: Resource,
    exitPoint?: Resource[],
    points?: number,
    name: string
}

export interface TerraformingCard {
    name: string,
    id: number,
    type: 'terraforming',
    resources: Resource[],
    points: number
}

export interface MilitaryCard {
    id: number,
    type: 'military',
    weapon: 'orbital' | 'intelligence' | 'fighters' | 'spaceborne',
    name: string,
}