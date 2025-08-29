
import { v4 } from "uuid";

export function newId(): Id {
    return v4() as Id;
}

export function isId(s: string): boolean {
    try {
        assertId(s);
        return true;    
    } catch {
        return false;
    }
}

export function assertId(s: string): asserts s is Id {
    if ( /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(s)) { return; }
    throw new Error(`Invalid ID: ${s}`);
}

export type Id = `${string}-${string}-${string}-${string}-${string}`;