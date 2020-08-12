import { hasDigit } from "../hasDigit";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ hasDigit });

describe("hasDigit", () => {
    it("should validate with default case", () => {
        expect(checkIf("asd123").hasDigit().isValid()).toBe(true);

        expect(checkIf("asd").hasDigit().isValid()).toBe(false);
    });

    it("should validate with custom number", () => {
        expect(checkIf("asd123").hasDigit(2).isValid()).toBe(true);

        expect(checkIf("asd1").hasDigit(2).isValid()).toBe(false);
    });

    it("should validate with non-latin number", () => {
        expect(checkIf("asd٦").hasDigit().isValid()).toBe(true);

        expect(checkIf("asd٦").hasDigit(2).isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(checkIf("asd").not().hasDigit().isValid()).toBe(true);

        expect(checkIf("asd2").not().hasDigit().isValid()).toBe(false);
    });

    it("should validate with error message", () => {
        expect(checkIf("asd12").hasDigit().hasErrors()).toEqual([]);

        expect(checkIf("asd12").hasDigit(3).hasErrors()).toEqual([
            "should have at least 3 digit(s)",
        ]);

        expect(
            checkIf("asd12")
                .hasDigit(3, "please use at least $value digits")
                .hasErrors()
        ).toEqual(["please use at least 3 digits"]);
    });
});
