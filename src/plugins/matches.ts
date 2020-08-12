import { TinyCheckerBase } from "src/base";

/**
 * Checks if string matched a given regular expression
 * @param {string | RegExp} regex Regular expression
 * @param {string} errorMessage Custom error message
 */
export function matches<T extends TinyCheckerBase>(
    this: T,
    regex: string | RegExp,
    errorMessage: string = "should match the pattern"
): T {
    return this._processValue(
        this._str.match(regex) !== null,
        errorMessage,
        String(regex)
    );
}
