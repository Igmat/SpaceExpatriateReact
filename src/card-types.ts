export type Resource = 'fuel' | 'minerals' | 'biotic materials' | 'machinery' | 'nanotechnologies' | 'dark matter';

export type CardDefinition = DeliveryCard | EngineeringCard | TerraformingCard | MilitaryCard;

export interface DeliveryCard {
    type: 'delivery',
    resources: Resource[],
}

export interface EngineeringCard {
    type: 'engineering',
    connection: 'start' | 'continue' | 'end',
    entryPoint?: Resource,
    exitPoint: Resource[],
    points?: number
}

export interface TerraformingCard {
    type: 'terraforming',
    resources: Resource[],
    points: number
}

export interface MilitaryCard {
    type: 'military',
    weapon: 'orbital' | 'intelligence' | 'fighters' | 'spaceborne'
}