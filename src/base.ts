import { Pluggable } from "./utils";

export class TinyCheckerBase extends Pluggable {
    #errors: string[] = [];
    #shouldInvert: boolean = false;
    _str: string = "";

    /**
     * Internal function to be used by plugins for processing the return value
     * @param {boolean} value Return value of the check
     * @param {string} errorMessage Default error message for the check
     * @param {string} [replacer] Value to replace the $value placeholder in the errorMessage
     */
    _processValue = (
        value: boolean,
        errorMessage: string,
        replacer?: string
    ): this => {
        const finalValue = this.#shouldInvert ? !value : value;
        const formattedErrorMessage =
            replacer != null
                ? errorMessage.replace("$value", replacer)
                : errorMessage;

        this.#errors = finalValue
            ? this.#errors
            : [...this.#errors, formattedErrorMessage];

        this.#shouldInvert = false;

        return this;
    };

    /**
     * Sets the string to be checked
     * @param {string} str The string to be checked
     */
    checkIf = (str: string) => {
        this._str = str;
        this.#errors = [];
        this.#shouldInvert = false;

        return this;
    };

    /**
     * Negates following check function
     */
    not = () => {
        this.#shouldInvert = true;
        return this;
    };

    /**
     * Check if string is valid
     * @returns {boolean} Result of the checks
     */
    isValid = (): boolean => this.#errors.length === 0;

    /**
     * Check if string has errors
     * @returns {string[]} Array of the invalid error messages
     */
    hasErrors = (): string[] => this.#errors;
}
