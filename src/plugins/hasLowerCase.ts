import { TinyCheckerBase } from "src/base";

/**
 * Check if string has minimum of lower case characters
 * @param {number} atLeast Minimium amount of lower case characters
 * @param {string} errorMessage Custom error message
 */
export function hasLowerCase<T extends TinyCheckerBase>(
    this: T,
    atLeast: number = 1,
    errorMessage: string = "should have at least $value lowercase character(s)"
): T {
    return this._processValue(
        (this._str.match(new RegExp(/\p{Ll}/, "gu")) || []).length >= atLeast,
        errorMessage,
        String(atLeast)
    );
}
