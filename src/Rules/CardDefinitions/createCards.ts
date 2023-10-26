import { ColonyCardModel } from "../CardsModel/colony";
import { DeliveryCardModel } from "../CardsModel/delivery";
import { EngineeringCardModel } from "../CardsModel/engineering";
import { MilitaryCardModel } from "../CardsModel/military";
import { TerraformingCardModel } from "../CardsModel/terraforming";
import { CardsModel } from "../CardsModel";

import { CardDefinition, ColonyCard } from "../card-types";

export type GeneralCardDefinition = ColonyCard | CardDefinition;
type AdjustedDefinition<T extends GeneralCardDefinition> = Omit<T, 'type' | 'id'> & { quantity?: number };
/*
export function createCards<T extends GeneralCardDefinition>(type: T['type'], ...definitions: AdjustedDefinition<T>[]) {

    return definitions
        .reduce((acc, { quantity = 1, ...el }) =>
            (acc.push(...Array(quantity).fill(el))
                && acc) || acc, // "|| acc" need for TS
            [] as AdjustedDefinition<T>[])
        .reduce((acc, el, id) =>
            (acc[id] = {
                id,
                type,
                ...el,
            } as T) && acc,
            {} as { [key: number]: T })

}*/

export function createCards<T extends GeneralCardDefinition>(type: T['type'], ...definitions: AdjustedDefinition<T>[]) {
  const cardObject: { [key: number]: DeliveryCardModel} = {};

  definitions.flatMap((definition, id) => {
    const { quantity = 1, ...el } = definition;
    return Array(quantity).fill(el).map((el) => {
      const card = new DeliveryCardModel(id, type as any, el.resources );
      cardObject[id] = card;
    });
  });

  console.log(cardObject)
  return cardObject ;
}