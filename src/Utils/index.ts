import { Resource, ResourcePrimitive } from "../Rules/card-types";

export const toArrayArray = (array: Resource[]): ResourcePrimitive[][] => {
  return array.map((el) => (typeof el === "string" ? [el] : el));
};

export const generateCombinations = <T>(data: T[][]) => {
  let combinations: T[][] = [[]];
  data.forEach((el) => {
    let newCombinations: T[][] = [];
    combinations.forEach((combination) => {
      el.forEach((resource) => {
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

export const removeDuplicateCombinations = <T>(combinations: Array<T[]>) => {
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
