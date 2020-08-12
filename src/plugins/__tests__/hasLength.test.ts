import { hasLength } from "../hasLength";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ hasLength });

describe("hasLength", () => {
    it("should validate with default case", () => {
        expect(checkIf("").hasLength().isValid()).toBe(true);

        expect(checkIf("asd").hasLength().isValid()).toBe(false);
    });

    it("should validate with custom number", () => {
        expect(checkIf("asd").hasLength(3).isValid()).toBe(true);

        expect(checkIf("asd").hasLength(2).isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(checkIf("asd").not().hasLength(2).isValid()).toBe(true);

        expect(checkIf("asd").not().hasLength(3).isValid()).toBe(false);
    });

    it("should validate with error message", () => {
        expect(checkIf("").hasLength().hasErrors()).toEqual([]);

        expect(checkIf("asd").hasLength(2).hasErrors()).toEqual([
            "should have exactly 2 characters",
        ]);

        expect(
            checkIf("asd").hasLength(2, "can it be exactly $value?").hasErrors()
        ).toEqual(["can it be exactly 2?"]);
    });
});
