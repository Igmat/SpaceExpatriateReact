import { ColonyCard } from '../card-types';

type AdjustedColonyDefinition = Omit<ColonyCard, 'type' | 'id'> & { quantity?: number };

export function createColonyCards(...definitions: AdjustedColonyDefinition[]) {
    return definitions
        .reduce((acc, { quantity = 1, ...el }) =>
            (acc.push(...Array(quantity).fill(el))
                && acc) || acc,
            [] as AdjustedColonyDefinition[])
        .reduce((acc, el, id) =>
            (acc[id] = {
                id,
                type: 'colony',
                ...el,
            } as ColonyCard) && acc,
            {} as { [key: number]: ColonyCard });
}