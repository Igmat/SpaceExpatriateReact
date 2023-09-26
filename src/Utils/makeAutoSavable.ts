import { autorun } from "mobx";

export function makeAutoSavable<T>(object: T,gameId:string, prefix:string, keys: (keyof T)[] = []) {
    const data = localStorage.getItem(`${prefix}_${gameId}`);
     if (data) {
       const parsedData = JSON.parse(data);
       keys.forEach((key) => {
         object[key] = parsedData[key];
       });
     }
   
     autorun(() => {
       const data = keys.reduce((acc, key) => {
         acc[key] = object[key];
         return acc;
       }, {} as any);
       localStorage.setItem(`${prefix}_${gameId}`, JSON.stringify(data));
     });
   }
   