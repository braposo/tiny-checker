import { TinyCheckerBase } from "src/base";

/**
 * Checks if string has maximum length of characters
 * @param {number} length Maximum number of charaters
 * @param {string} errorMessage Custom error message
 */
export function hasMaxLength<T extends TinyCheckerBase>(
    this: T,
    length: number = 1,
    errorMessage: string = "should have a maximum length of $value"
): T {
    return this._processValue(
        this._str.length <= length,
        errorMessage,
        String(length)
    );
}
