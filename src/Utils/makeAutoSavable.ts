import { autorun } from "mobx";

const isKey = (key: unknown): key is string | number | symbol =>
  typeof key === "string" || typeof key === "number" || typeof key === "symbol";

interface AutoSavableProperty<T, K extends keyof T = keyof T> {
  key: K;
  condition?: (value: T[K]) => boolean;
}

export function makeAutoSavable<T>(
  object: T,
  gameId: string,
  prefix: string,
  keys: (keyof T | AutoSavableProperty<T>)[] = [],
  saveCondition?: () => boolean
) {
  const savedData = localStorage.getItem(`${prefix}_${gameId}`);
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    keys.forEach((property) => {
      const key = isKey(property) ? property : property.key;
      object[key] = parsedData[key];
    });
  }

  let data: Partial<T> = {};

  autorun(() => {
    data = keys.reduce((acc, property) => {
      const key = isKey(property) ? property : property.key;
      const condition =
        (isKey(property) ? undefined : property.condition) || (() => true);
      acc[key] = condition(object[key]) ? object[key] : data[key];
      return acc;
    }, {} as any);
    if (saveCondition === undefined || saveCondition()) {
      localStorage.setItem(`${prefix}_${gameId}`, JSON.stringify(data));
    }
  });
  return !!savedData;
}
