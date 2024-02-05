
export function deepClone<T>(src: T): Writeable<T> {
    if (src === null || src === undefined) { return src; }
    const json = JSON.stringify(src);
    const clone = JSON.parse(json);
    return clone as T;
}


export type Writeable<T> = { -readonly [P in keyof T]: Writeable<T[P]> };