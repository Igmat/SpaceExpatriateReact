import localStorage from "mobx-localstorage";//new

export const writeToLS = <T = undefined> (key: string, value: T ) =>{
    localStorage.setItem(key, value);
  }
export const readFromLS = (key: string)  => (
    localStorage.getItem(key)
    )

