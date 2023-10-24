import { makeAutoObservable } from "mobx";
import type { ModalType } from "../ControlPanel";

export type ModalOptions<T> = {
    onSelect: (selected: T) => void;
    onClose?: () => void;
    params?: readonly T[];
}
export class ModalManager {
    constructor(
    ) {
        makeAutoObservable(this)
    }

    type?: ModalType = undefined;
    private _params?: readonly unknown[] = undefined;
    private _onSelect?: (selected: unknown) => void = undefined;

    get params() {
        return this._params;
    }

    get onSelect() {
        return this._onSelect;
    }

    async show<T>(type: ModalType, params?: readonly T[]): Promise<T> {

        this.type = type;

        this._params = params;
        
        return new Promise((resolve) => {
            this._onSelect = (selected) => {
                resolve(selected as T);
                this.type = undefined;
            }
        })
    }
}