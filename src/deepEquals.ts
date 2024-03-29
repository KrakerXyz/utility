
export function deepEquals<T extends Record<string, any>, K extends keyof T>(a: T | null | undefined, b: T | null | undefined, ignore: K[] = []): boolean {
    if (a === b) { return true; }
    if ((a === null || a === undefined) && (b === null || b === undefined)) { return true; }
    if ((a === null || a === undefined) && b !== null && b !== undefined) { return false; }
    if ((b === null || b === undefined) && a !== null && a !== undefined) { return false; }

    const aKeys = Object.getOwnPropertyNames(a).filter(k => !ignore.includes(k as any));
    const bKeys = Object.getOwnPropertyNames(b).filter(k => !ignore.includes(k as any));

    if (aKeys.length !== bKeys.length) { return false; }

    for (const aKey of aKeys) {
        if (!bKeys.includes(aKey)) { return false; }

        const aValue = a![aKey];
        const bValue = b![aKey];

        if (aValue === bValue) { continue; }

        if (typeof aValue !== typeof bValue) { return false; }

        if (Array.isArray(aValue)) {
            if (aValue.length !== bValue.length) { return false; }
            for (let i = 0; i < aValue.length; i++) {
                const aArrValue = aValue[i];
                const bArrValue = aValue[i];

                if (aArrValue === bArrValue) { continue; }

                const aArrType = typeof aArrValue;

                if (aArrType !== typeof bArrValue) { return false; }

                if (Array.isArray(aArrValue)) {
                    throw new Error('Array of Arrays not implemented');
                }

                if (aArrType === 'object') {
                    const objEq = deepEquals(aArrValue, bArrValue);
                    if (!objEq) { return false; }
                    continue;
                }

                return false; //The only types left are value types like numbers, strings, symbols which would have continued above if they were equal
            }
        }

        if (typeof aValue === 'object') {
            //I tried just using json here but the properties were out of order
            const objsEq = deepEquals(aValue, bValue);
            if (!objsEq) { return false; }
            continue;
        }

        return false; //The only types left are value types like numbers, strings, symbols which would have continued above if they were equal

    }

    return true;
}