import { CardDefinition } from "../card-types";

type AdjustedDefinition<T extends CardDefinition> = Omit<T, 'type' | 'id'> & { quantity?: number};

export function createCards<T extends CardDefinition>(type: T['type'], ...definitions: AdjustedDefinition<T>[]) {

    return definitions
        .reduce((acc, { quantity = 1, ...el }) =>
            acc.push(...Array(quantity).fill(el))
                && acc || acc, // "|| acc" need for TS
            [] as Omit<T, 'type' | 'id'>[])
        .reduce((acc, el, id) => 
            (acc[id] = {
                id,
                type,
                ...el,
            } as T ) && acc,
            {} as { [key: number]: T })

         
}
