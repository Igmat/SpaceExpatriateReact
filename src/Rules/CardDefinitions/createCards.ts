import { ColonyCardModel } from "../CardsModel/colony";
import { DeliveryCardModel } from "../CardsModel/delivery";
import { EngineeringCardModel } from "../CardsModel/engineering";
import { MilitaryCardModel } from "../CardsModel/military";
import { TerraformingCardModel } from "../CardsModel/terraforming";
import { CardDefinition, ColonyCard } from "../card-types";

export type GeneralCardDefinition = ColonyCard | CardDefinition;
type AdjustedDefinition<T extends GeneralCardDefinition> = Omit<T, 'type' | 'id'> & { quantity?: number };

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

}
/*
export function createCardsф<T extends GeneralCardDefinition>(type: T['type'], ...definitions: AdjustedDefinition<T>[]) {
    const cardObject: { [key: number]: CardModel } = {};
  
    definitions.flatMap((definition, id) => {
      const { quantity = 1, ...el } = definition;
      return Array(quantity).fill(el).map(() => {
        let card: CardModel;
  
        if (type === "delivery") {
          card = new DeliveryCardModel(id, type as CardType);
        } else if (type === "engineering") {
          card = new EngineeringCardModel(id, type as CardType);
        } else if (type === "terraforming") {
          card = new TerraformingCardModel(id, type as CardType);
        } else if (type === "military") {
          card = new MilitaryCardModel(id, type as CardType);
        } else if (type === "colony") {
          card = new ColonyCardModel(id, type as CardType);
        } else {
          throw new Error("Unknown card type");
        }
  
        cardObject[card.id] = card;
      });
    });
  
    return cardObject as { [key: number]: T };
  }
  */