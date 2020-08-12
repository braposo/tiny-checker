import { TinyCheckerBase } from "src/base";

/**
 * Checks if string has exact length
 * @param {number} length Number of charaters
 * @param {string} errorMessage Custom error message
 */
export function hasLength<T extends TinyCheckerBase>(
    this: T,
    length: number = 0,
    errorMessage: string = "should have exactly $value characters"
): T {
    return this._processValue(
        this._str.length === length,
        errorMessage,
        String(length)
    );
}
