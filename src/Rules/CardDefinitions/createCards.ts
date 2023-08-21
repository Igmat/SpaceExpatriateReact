import { CardDefinition } from "../card-types";

export function createCards<T extends CardDefinition>(
  type: T["type"],
  ...definitions: Omit<T, "type" | "id">[]
) {
  return definitions.reduce(
    (acc, el, id) =>
      (acc[id] = {
        id,
        type,
        ...el,
      } as T) && acc,
    {} as { [key: number]: T }
  );
}
