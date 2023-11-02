import { makeAutoObservable } from "mobx";
import type { ModalType } from "../ControlPanel";

export type ModalOptions<T> = {
    onSelect: (selected: T) => void;
    params: readonly T[];
}

export type ModalOptionsColony<T> = {
    onSelect: (selected: T) => void;
    params: T;
}
export class ModalManager {
    constructor(
    ) {
        makeAutoObservable(this)
    }

    private _type?: ModalType = undefined;
    private _params?: unknown | readonly unknown[] = undefined;
    private _onSelect?: (selected: unknown) => void = undefined;

    get type() {
        return this._type;
    }

    get params() {
        return this._params;
    }
    
    get onSelect() {
        return this._onSelect;
    }

    async show<T>(type: ModalType, params: T | readonly T[]): Promise<T> {

        this._type = type;

        this._params = params;
        
        return new Promise((resolve) => {
            this._onSelect = (selected) => {
                resolve(selected as T);
                this._type = undefined;
            }
        })
    }
}