import { CardDefinition, ColonyCard } from "../card-types";

type GeneralCardDefinition = ColonyCard | CardDefinition;
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
