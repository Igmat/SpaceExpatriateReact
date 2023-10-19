import { makeAutoObservable } from "mobx";
import { ResourcePrimitive, isResourcePrimitive } from "./card-types";
import { GameState } from ".";
import { type } from "os";

export type ModalType = "military" | "delivery" | "terraforming" | "resources";

export type DeliveryModalOption = "charter" | "garbage";

export type ResourcesModalOption = Exclude<ResourcePrimitive, "dark matter">;

export type MillitaryModalOptions = "exploration" | "political";

export type ModalOptions<T> = {
    chooseOption: (option: T) => void;
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
    private _params?: ResourcePrimitive[][];
    private _onSelect?: (selected: ResourcePrimitive[]) => void;
    private _option: string = "";
    
    get step() {
        return this.gamestate.round.step;
    }

    get params() {
        return this._params;
    }

    get onSelect() {
        return this._onSelect;
    }

    // option приходит из компонентов модалок 
    setOption(option: string) {
        this._option = option;
    }

    // метод используется в компоненте для отрисовки
    async show<T>(params?: T[]): Promise<T> {

        if (params && this.step === "resources") {
            this._params = params as ResourcePrimitive[][];
            return new Promise((resolve) => {
                    resolve(this._params as T);
                })
        
        }

        if (this.step === "options") {

            if (this._option === "charter" || this._option === "garbage") {
                this.deliveryOption = this._option as DeliveryModalOption
            };

            if (isResourcePrimitive(this._option) && (this.deliveryOption === "charter")) {
                this.gamestate.resources.addResource(this._option);
            }

            if (this.deliveryOption === "garbage") {
                this.gamestate.resources.removeResourcesFromGarbage(
                    this._option as ResourcesModalOption
                );
            }

            this.gamestate.resources.getResources();
            this.gamestate.round.startPerformingStep();
        }

        return new Promise((resolve) => {
            resolve(this._option as T);
        });
    }
}