import { ColonyCard } from '../card-types';

type AdjustedColonyDefinition = Omit<ColonyCard, 'type' | 'id'>;

export function createColonyCards(...definitions: AdjustedColonyDefinition[]) {
    return definitions
        .reduce((acc, el, id) =>
            (acc[id] = {
                id,
                type: 'colony',
                ...el,
            } as ColonyCard) && acc,
            {} as { [key: number]: ColonyCard });
}