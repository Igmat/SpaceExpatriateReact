import localStorage from "mobx-localstorage";

export const writeToLS = <T = undefined>(key: string, value: T): void => {
  localStorage.setItem(key, value);
};

export const readFromLS = <T = undefined>(key: string, defaultValue: T): T => {
  const data = localStorage.getItem(key);
  return data !== null ? data : defaultValue;
}

