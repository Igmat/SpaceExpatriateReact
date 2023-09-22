import localStorage from "mobx-localstorage";

export const writeToLS = <T = undefined>(key: string, value: T): void => {
  localStorage.setItem(key, value);
};

export const readFromLS = <T = undefined>(key: string, defaultValue: undefined = undefined): T | undefined => (
 localStorage.getItem(key) !== null ? localStorage.getItem(key) : defaultValue
)
