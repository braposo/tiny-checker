import { hasMaxLength } from "../hasMaxLength";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ hasMaxLength });

describe("hasMaxLength", () => {
    it("should validate with default case", () => {
        expect(checkIf("").hasMaxLength().isValid()).toBe(true);

        expect(checkIf("asd").hasMaxLength().isValid()).toBe(false);
    });

    it("should validate with custom number", () => {
        expect(checkIf("asd").hasMaxLength(5).isValid()).toBe(true);

        expect(checkIf("asd").hasMaxLength(2).isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(checkIf("asd").not().hasMaxLength(2).isValid()).toBe(true);

        expect(checkIf("asd").not().hasMaxLength(5).isValid()).toBe(false);
    });

    it("should validate with error message", () => {
        expect(checkIf("").hasMaxLength().hasErrors()).toEqual([]);

        expect(checkIf("asd").hasMaxLength(2).hasErrors()).toEqual([
            "should have a maximum length of 2",
        ]);

        expect(
            checkIf("asd")
                .hasMaxLength(2, "can it be smaller than $value?")
                .hasErrors()
        ).toEqual(["can it be smaller than 2?"]);
    });
});
