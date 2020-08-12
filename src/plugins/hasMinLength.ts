import { TinyCheckerBase } from "src/base";

/**
 * Checks if string has minimum length of characters
 * @param {number} length Minimum number of charaters
 * @param {string} errorMessage Custom error message
 */
export function hasMinLength<T extends TinyCheckerBase>(
    this: T,
    length: number = 1,
    errorMessage: string = "should have a minimum length of $value"
): T {
    return this._processValue(
        this._str.length >= length,
        errorMessage,
        String(length)
    );
}
