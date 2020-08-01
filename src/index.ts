export class CheckIf {
    private str: string = "";
    private errors: string[] = [];
    private shouldInvert: boolean = false;

    constructor(str: string) {
        this.str = str;
    }

    private processValue = (value: boolean, errorMessage: string) => {
        const finalValue = this.shouldInvert ? !value : value;

        return finalValue ? this.errors : [...this.errors, errorMessage];
    };

    private regexList = {
        email: new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        upperCaseChar: new RegExp(/\p{Lu}/, "gu"),
        lowerCaseChar: new RegExp(/\p{Ll}/, "gu"),
        digit: new RegExp(/\p{Nd}/, "gu"),
    };

    private errorMesssages = {
        hasMinLength: "should have a minimum length of $value",
        hasMaxLength: "should have a maximum length of $value",
        isEmail: "should be a valid email address",
        hasUpperCase: "should have at least $value uppercase character(s)",
        hasLowerCase: "should have at least $value lowercase character(s)",
        hasDigit: "should have at least $value digit(s)",
        matches: "should match the pattern",
    };

    not = () => {
        this.shouldInvert = true;
        return this;
    };

    hasMinLength = (
        length: number = 1,
        errorMessage: string = this.errorMesssages.hasMinLength
    ) => {
        this.errors = this.processValue(
            this.str.length >= length,
            errorMessage.replace("$value", String(length))
        );
        this.shouldInvert = false;

        return this;
    };

    hasMaxLength = (
        length: number = Infinity,
        errorMessage: string = this.errorMesssages.hasMaxLength
    ) => {
        this.errors = this.processValue(
            this.str.length <= length,
            errorMessage.replace("$value", String(length))
        );
        this.shouldInvert = false;

        return this;
    };

    isEmail = (errorMessage: string = this.errorMesssages.isEmail) => {
        this.errors = this.processValue(
            this.str.match(this.regexList.email) !== null,
            errorMessage
        );
        this.shouldInvert = false;

        return this;
    };

    hasUpperCase = (
        atLeast: number = 1,
        errorMessage: string = this.errorMesssages.hasUpperCase
    ) => {
        this.errors = this.processValue(
            (this.str.match(this.regexList.upperCaseChar) || []).length >=
                atLeast,
            errorMessage.replace("$value", String(atLeast))
        );
        this.shouldInvert = false;

        return this;
    };

    hasLowerCase = (
        atLeast: number = 1,
        errorMessage: string = this.errorMesssages.hasLowerCase
    ) => {
        this.errors = this.processValue(
            (this.str.match(this.regexList.lowerCaseChar) || []).length >=
                atLeast,
            errorMessage.replace("$value", String(atLeast))
        );
        this.shouldInvert = false;

        return this;
    };

    hasDigit = (
        atLeast: number = 1,
        errorMessage: string = this.errorMesssages.hasDigit
    ) => {
        this.errors = this.processValue(
            (this.str.match(this.regexList.digit) || []).length >= atLeast,
            errorMessage.replace("$value", String(atLeast))
        );
        this.shouldInvert = false;

        return this;
    };

    matches = (
        regex: string | RegExp,
        errorMessage: string = this.errorMesssages.matches
    ) => {
        this.errors = this.processValue(
            this.str.match(regex) !== null,
            errorMessage.replace("$value", String(regex))
        );
        this.shouldInvert = false;

        return this;
    };

    isValid = () => this.errors.length === 0;
    hasErrors = () => this.errors;
}

export const checkIf = (str: string) => new CheckIf(str);
