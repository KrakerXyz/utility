
import { v4 } from "uuid";

export function newId(): Id {
    return v4() as Id;
}

export type Id = `${string}-${string}-${string}-${string}-${string}`;