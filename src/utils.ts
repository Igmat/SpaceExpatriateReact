import localStorage from "mobx-localstorage";

export const writeToLS = <T = undefined>(key: string, value: T): void => {
  localStorage.setItem(key, value);
};

export const readFromLS = <T = undefined>(key: string): T | undefined => {
  //return localStorage.getItem(key);

  try {
    return key !== undefined ? localStorage.getItem(key) : undefined;
  } catch (error) {
    console.error(
      `Error reading item from mobx-localstorage with key ${key}:`,
      error
    );
  }
};
