import { TinyCheckerBase } from "src/base";

/**
 * Check if string has minimum of upper case characters
 * @param {number} atLeast Minimium amount of upper case characters
 * @param {string} errorMessage Custom error message
 */
export function hasUpperCase<T extends TinyCheckerBase>(
    this: T,
    atLeast: number = 1,
    errorMessage: string = "should have at least $value uppercase character(s)"
): T {
    return this._processValue(
        (this._str.match(new RegExp(/\p{Lu}/, "gu")) || []).length >= atLeast,
        errorMessage,
        String(atLeast)
    );
}
