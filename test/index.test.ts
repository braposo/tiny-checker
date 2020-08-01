import { checkIf } from "../src/index";

it("should check if string has minimum length", () => {
    // Valid
    expect(
        checkIf("asd")
            .hasMinLength()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .hasMinLength(2)
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .not()
            .hasMinLength(10)
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("asd")
            .hasMinLength(10)
            .isValid()
    ).toBe(false);

    expect(
        checkIf("asd")
            .hasMinLength(10)
            .hasErrors()
    ).toEqual(["should have a minimum length of 10"]);

    expect(
        checkIf("asd")
            .hasMinLength(10, "can it be bigger than $value?")
            .hasErrors()
    ).toEqual(["can it be bigger than 10?"]);
});

it("should check if string has maximum length", () => {
    // Valid
    expect(
        checkIf("asd")
            .hasMaxLength()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .hasMaxLength(5)
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .not()
            .hasMaxLength(1)
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("asd")
            .hasMaxLength(2)
            .isValid()
    ).toBe(false);

    expect(
        checkIf("asd")
            .hasMaxLength(2)
            .hasErrors()
    ).toEqual(["should have a maximum length of 2"]);

    expect(
        checkIf("asd")
            .hasMaxLength(2, "can it be smaller than $value?")
            .hasErrors()
    ).toEqual(["can it be smaller than 2?"]);
});

it("should check if string is a valid email", () => {
    // Valid
    expect(
        checkIf("email@example.com")
            .isEmail()
            .isValid()
    ).toBe(true);
    expect(
        checkIf("email.other@example23.gz")
            .isEmail()
            .isValid()
    ).toBe(true);
    expect(
        checkIf("bademail@example")
            .not()
            .isEmail()
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("bademail@example")
            .isEmail()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("bad%#%&//(email@example.com")
            .isEmail()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("bad%#%&//(email@example.com")
            .isEmail()
            .hasErrors()
    ).toEqual(["should be a valid email address"]);

    expect(
        checkIf("bad%#%&//(email@example.com")
            .isEmail("that doesn't look like a valid email!")
            .hasErrors()
    ).toEqual(["that doesn't look like a valid email!"]);
});

it("should check if string has uppercase character(s)", () => {
    // Valid
    expect(
        checkIf("aSd")
            .hasUpperCase()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("ASd")
            .hasUpperCase(2)
            .isValid()
    ).toBe(true);

    expect(
        checkIf("aÍÇ")
            .hasUpperCase()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .not()
            .hasUpperCase()
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("asd")
            .hasUpperCase()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("aSd")
            .hasUpperCase(2)
            .isValid()
    ).toBe(false);

    expect(
        checkIf("aSd")
            .hasUpperCase(2)
            .hasErrors()
    ).toEqual(["should have at least 2 uppercase character(s)"]);

    expect(
        checkIf("aSd")
            .hasUpperCase(2, "please use at least $value uppercase characters")
            .hasErrors()
    ).toEqual(["please use at least 2 uppercase characters"]);
});

it("should check if string has lowercase character(s)", () => {
    // Valid
    expect(
        checkIf("aSD")
            .hasLowerCase()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("Asd")
            .hasLowerCase(2)
            .isValid()
    ).toBe(true);

    expect(
        checkIf("Aíç")
            .hasLowerCase()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("ASD")
            .not()
            .hasLowerCase()
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("ASD")
            .hasLowerCase()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("AsD")
            .hasLowerCase(2)
            .isValid()
    ).toBe(false);

    expect(
        checkIf("AsD")
            .hasLowerCase(2)
            .hasErrors()
    ).toEqual(["should have at least 2 lowercase character(s)"]);

    expect(
        checkIf("AsD")
            .hasLowerCase(2, "please use at least $value lowercase characters")
            .hasErrors()
    ).toEqual(["please use at least 2 lowercase characters"]);
});

it("should check if string has digit(s)", () => {
    // Valid
    expect(
        checkIf("asd123")
            .hasDigit()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd123")
            .hasDigit(2)
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd٦")
            .hasDigit()
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .not()
            .hasDigit()
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("asd")
            .hasDigit()
            .isValid()
    ).toBe(false);

    expect(
        checkIf("asd12")
            .hasDigit(3)
            .isValid()
    ).toBe(false);

    expect(
        checkIf("asd12")
            .hasDigit(3)
            .hasErrors()
    ).toEqual(["should have at least 3 digit(s)"]);

    expect(
        checkIf("asd12")
            .hasDigit(3, "please use at least $value digits")
            .hasErrors()
    ).toEqual(["please use at least 3 digits"]);
});

it("should check if string matches regex", () => {
    // Valid
    expect(
        checkIf("asd")
            .matches(/[a-z]{2}/g)
            .isValid()
    ).toBe(true);

    expect(
        checkIf("asd")
            .not()
            .matches(/[a-z]{4}/g)
            .isValid()
    ).toBe(true);

    // Invalid
    expect(
        checkIf("asd")
            .matches(/[a-z]{4}/g)
            .isValid()
    ).toBe(false);

    expect(
        checkIf("asd")
            .matches(/[a-z]{4}/g)
            .hasErrors()
    ).toEqual(["should match the pattern"]);

    expect(
        checkIf("asd")
            .matches(/[a-z]{4}/g, "should have 4 letters")
            .hasErrors()
    ).toEqual(["should have 4 letters"]);
});

it("should check if string passes a combination of checks", () => {
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
