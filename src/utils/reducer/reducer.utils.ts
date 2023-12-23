import { AnyAction } from "redux";

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

export function createAction<T extends string, P>(type: Text, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: Text, payload: void): Action<T>;

export function createAction<T extends string, P>(type: Text, payload: P) {
    return { type, payload };
}