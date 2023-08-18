/// <reference types="react-scripts" />

export declare global {
    interface ObjectConstructor {
        keys<T>(o: T): (keyof T)[];
    }
}