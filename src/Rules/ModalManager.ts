import { makeAutoObservable } from "mobx";
import { ResourcePrimitive } from "./card-types";

export class ModalManager {
    constructor(gameId: string) {
       makeAutoObservable(this) 
    }

    private _onSelect?: (selected: ResourcePrimitive[]) => void;

    get onSelect() {
        return this._onSelect;
    }
    
    async show(params: ResourcePrimitive[][]): Promise<ResourcePrimitive[]> {
        return new Promise(resolve => {
            this._onSelect = (resources) => resolve(resources)
        })
    }
    
}