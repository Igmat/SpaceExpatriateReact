import { makeAutoObservable } from "mobx";
import { ResourcePrimitive } from "./card-types";
import { GameState } from ".";

export type ModalType = "military" | "deliveryOptions" | "deliveryResources" | "terraforming" | "resources";

export type DeliveryModalOption = "charter" | "garbage";

export type ResourcesModalOption = Exclude<ResourcePrimitive, "dark matter">;

export type MillitaryModalOptions = "exploration" | "political";

export type ModalOptions<T> = {
    onSelect: (selected: T) => void;
    onClose?: () => void;
    params?: T[];
}
export class ModalManager {
    constructor(
        gameId: string,
        private readonly gamestate: GameState,
    ) {
        makeAutoObservable(this)
    }

    deliveryOption?: DeliveryModalOption;
    type?: ModalType;
    private _params?: any[];
    private _onSelect?: (selected: ResourcePrimitive[]) => void;

    get params() {
        return this._params;
    }

    get onSelect() {
        return this._onSelect;
    }

    // метод используется в компоненте для отрисовки
    async show<T>(type: ModalType, params?: T[]): Promise<T> {

        this.type = type;

        this._params = params;
        
        return new Promise((resolve) => {
            this._onSelect = (selected) => {
                resolve(selected as any);
                this.type = undefined;
            }
        })
    }

}