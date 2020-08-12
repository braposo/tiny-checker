import { checkIf, defaultValidators, TinyCheckerBase } from "src";

it("should check if default plugins pass a combination of checks", () => {
    // Valid
    expect(
        checkIf("StrongPassword123")
            .hasMinLength(9)
            .hasMaxLength(32)
            .hasUpperCase()
            .hasLowerCase()
            .hasDigit()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("MEDIUMPASSWORD")
            .hasMinLength(9)
            .hasMaxLength(32)
            .not()
            .hasDigit()
            .hasUpperCase()
            .not()
            .hasLowerCase()
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("weakPassword")
            .hasMinLength(9)
            .hasMaxLength(32)
            .hasUpperCase()
            .hasLowerCase()
            .hasDigit()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("MediumPassword123")
            .hasMinLength(9)
            .hasMaxLength(32)
            .not()
            .hasDigit()
            .hasUpperCase()
            .hasLowerCase()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("asd")
            .hasMinLength(9)
            .hasMaxLength(2)
            .hasDigit()
            .hasUpperCase()
            .not()
            .hasLowerCase()
            .isEmail()
            .matches(/[0-9]/g)
            .hasErrors()
    ).toHaveLength(7);
});

it("should allow 3rd party plugins", () => {
    function isUpperCase<T extends TinyCheckerBase>(
        this: T,
        errorMessage: string = "should be all uppercase"
    ): T {
        return this._processValue(
            (this._str.match(new RegExp(/\p{Lu}/, "gu")) || []).length >=
                this._str.length,
            errorMessage
        );
    }

    const { checkIf } = TinyCheckerBase.load({
        ...defaultValidators,
        isUpperCase,
    });

    expect(
        checkIf("ALLCAPS")
            .hasMinLength(2)
            .hasMaxLength(32)
            .isUpperCase()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("NotAllCAPS")
            .hasMinLength(2)
            .hasMaxLength(32)
            .not()
            .isUpperCase()
            .isValid()
    ).toBe(true);
});
