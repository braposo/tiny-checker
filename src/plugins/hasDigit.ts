import { TinyCheckerBase } from "src/base";

/**
 * Check if string contains digits
 * @param {number} atLeast Minimum amount of digits
 * @param {string} errorMessage Custom error message
 */
export function hasDigit<T extends TinyCheckerBase>(
    this: T,
    atLeast: number = 1,
    errorMessage: string = "should have at least $value digit(s)"
): T {
    return this._processValue(
        (this._str.match(new RegExp(/\p{Nd}/, "gu")) || []).length >= atLeast,
        errorMessage,
        String(atLeast)
    );
}
