
/** Returns e.message || e if string || String(e) */
export function errToStr(e: unknown): string {
    if (!e) {
        return '';
    }

    if (e instanceof Error) {
        return e.message;
    }
    
    if (typeof e === "string") {
        return e;
    } 

    return String(e);          
}