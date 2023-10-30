import { ColonyCard } from "../CardsModel/colony";
import { CardDefinition } from "../card-types";


export type GeneralCardDefinition = ColonyCard | CardDefinition;
type AdjustedDefinition<T extends GeneralCardDefinition> = Omit<T,"type" | "id"> & {
   quantity?: number };

export function createCards<T extends GeneralCardDefinition>(
  cardClass: new (id: number, data: T) => T,
  ...definitions: AdjustedDefinition<T>[]
): { [key: number]: T } {
  return definitions
    .reduce(
      (acc, { quantity = 1, ...el }) =>
        (acc.push(...Array(quantity).fill({ ...el })) && acc) || acc,
      [] as T[]
    )
    .reduce((acc, el, id) => {
      const card = new cardClass(id, el);
      acc[id] = card;
      return acc;
    }, {} as { [key: number]: T });
}
