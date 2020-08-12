import { hasMinLength } from "../hasMinLength";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ hasMinLength });

describe("hasMinLength", () => {
    it("should validate with default case", () => {
        expect(checkIf("asd").hasMinLength().isValid()).toBe(true);

        expect(checkIf("").hasMinLength().isValid()).toBe(false);
    });

    it("should validate with custom number", () => {
        expect(checkIf("asd").hasMinLength(2).isValid()).toBe(true);

        expect(checkIf("asd").hasMinLength(5).isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(checkIf("asd").not().hasMinLength(5).isValid()).toBe(true);

        expect(checkIf("asd").not().hasMinLength(2).isValid()).toBe(false);
    });

    it("should validate with error message", () => {
        expect(checkIf("asd").hasMinLength().hasErrors()).toEqual([]);

        expect(checkIf("asd").hasMinLength(4).hasErrors()).toEqual([
            "should have a minimum length of 4",
        ]);

        expect(
            checkIf("asd")
                .hasMinLength(4, "can it be bigger than $value?")
                .hasErrors()
        ).toEqual(["can it be bigger than 4?"]);
    });
});
