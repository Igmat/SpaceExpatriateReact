import { EngineeringCard, ResourcePrimitive } from "../Rules/card-types";

export const generateCombinations = (card: EngineeringCard) => {
  let combinations: Array<ResourcePrimitive[]> = [[]];
  card.exitPoint!.forEach((el) => {
    const list: ResourcePrimitive[] = typeof el === "string" ? [el] : el;
    let newCombinations: Array<ResourcePrimitive[]> = [];
    combinations.forEach((combination) => {
      list.forEach((resource) => {
        newCombinations.push([...combination, resource]);
      });
    });
    combinations = removeDuplicateCombinations(newCombinations);
  });
  return combinations;
};

export const areCombinationsEqual = <T>(
  combination1: T[],
  combination2: T[]
) => {
  if (combination1.length !== combination2.length) {
    return false;
  }
  const sortedCombination1 = combination1.slice().sort();
  const sortedCombination2 = combination2.slice().sort();
  for (let i = 0; i < sortedCombination1.length; i++) {
    if (sortedCombination1[i] !== sortedCombination2[i]) {
      return false;
    }
  }
  return true;
};

export const removeDuplicateCombinations = <T>(
  combinations: Array<T[]>
) => {
  const uniqueCombinations = [];
  for (const combination of combinations) {
    let isDuplicate = false;
    for (const uniqueCombination of uniqueCombinations) {
      if (areCombinationsEqual(combination, uniqueCombination)) {
        isDuplicate = true;
        break;
      }
    }
    if (!isDuplicate) {
      uniqueCombinations.push(combination);
    }
  }
  return uniqueCombinations;
};
