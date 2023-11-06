import { ColonyCard } from "../Cards/colony";
import { GeneralCard } from "../card-types";

export type GeneralCards = ColonyCard | GeneralCard;
type AdjustedDefinition<D> = D & { quantity?: number };

export function createCards<T extends GeneralCards, D> (
  cardClass: new (id: number, data: D) => T,
  ...definitions: AdjustedDefinition<D>[]
): { [key: number]: T } {
  return definitions
    .reduce(
      (acc, { quantity = 1, ...el }) =>
        (acc.push(...Array(quantity).fill({ ...el })) && acc) || acc,
      [] as D[]
    )
    .reduce((acc, el, id) => {
      const card = new cardClass(id, el);
      acc[id] = card;
      return acc;
    }, {} as { [key: number]: T });
}

/*
export function createCards<T extends GeneralCards, D, A> (
  cardClass: new (id: number, data: D, args: A) => T,
  ...definitions: (AdjustedDefinition<D> & { args: A })[]
): { [key: number]: T } {
  return definitions
    .reduce(
      (acc, { quantity = 1, ...el }) =>
        (acc.push(...Array(quantity).fill({ ...el })) && acc) || acc,
      [] as (D & { args: A })[]
    )
    .reduce((acc, el, id) => {
      const card = new cardClass(id, el, el.args);
      acc[id] = card;
      return acc;
    }, {} as { [key: number]: T });
}
*/