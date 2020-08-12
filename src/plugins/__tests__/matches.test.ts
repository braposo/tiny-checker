import { matches } from "../matches";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ matches });

describe("isEmail", () => {
    it("should validate with simple regex", () => {
        expect(
            checkIf("asd")
                .matches(/[a-z]{2}/g)
                .isValid()
        ).toBe(true);

        expect(
            checkIf("asd")
                .matches(/[a-z]{4}/g)
                .isValid()
        ).toBe(false);
    });

    it("should validate with string", () => {
        expect(checkIf("asd").matches("[a-z]{2}").isValid()).toBe(true);

        expect(checkIf("asd").matches("[a-z]{4}").isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(
            checkIf("asd")
                .not()
                .matches(/[a-z]{4}/g)
                .isValid()
        ).toBe(true);

        expect(
            checkIf("asd")
                .not()
                .matches(/[a-z]{2}/g)
                .isValid()
        ).toBe(false);
    });

    it("should validate with error message", () => {
        expect(
            checkIf("asd")
                .matches(/[a-z]{2}/g)
                .hasErrors()
        ).toEqual([]);

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
});
