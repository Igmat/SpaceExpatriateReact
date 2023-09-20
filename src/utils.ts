import localStorage from "mobx-localstorage";

export const writeToLS = (key: string, value: any) =>{
    localStorage.setItem(key, value);
  }

export const readFromLS = (key: string)  => (
    localStorage.getItem(key)
    )

