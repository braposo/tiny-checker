import { TinyCheckerBase } from "src/base";

/**
 * Checks if string is email format
 * @param {string} errorMessage Custom error message
 */
export function isEmail<T extends TinyCheckerBase>(
    this: T,
    errorMessage: string = "should be a valid email address"
): T {
    return this._processValue(
        this._str.match(
            new RegExp(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) !== null,
        errorMessage
    );
}
