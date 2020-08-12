import { hasUpperCase } from "../hasUpperCase";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ hasUpperCase });

describe("hasUpperCase", () => {
    it("should validate with default case", () => {
        expect(checkIf("aSd").hasUpperCase().isValid()).toBe(true);

        expect(checkIf("asd").hasUpperCase().isValid()).toBe(false);
    });

    it("should validate with custom number", () => {
        expect(checkIf("ASd").hasUpperCase(2).isValid()).toBe(true);

        expect(checkIf("aSd").hasUpperCase(2).isValid()).toBe(false);
    });

    it("should validate with non-latin letter", () => {
        expect(checkIf("aÍÇ").hasUpperCase().isValid()).toBe(true);

        expect(checkIf("aíç").hasUpperCase(2).isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(checkIf("asd").not().hasUpperCase().isValid()).toBe(true);

        expect(checkIf("aSd").not().hasUpperCase().isValid()).toBe(false);
    });

    it("should validate with error message", () => {
        expect(checkIf("aSd").hasUpperCase().hasErrors()).toEqual([]);

        expect(checkIf("AsD").hasUpperCase(3).hasErrors()).toEqual([
            "should have at least 3 uppercase character(s)",
        ]);

        expect(
            checkIf("AsD")
                .hasUpperCase(
                    3,
                    "please use at least $value uppercase character(s)"
                )
                .hasErrors()
        ).toEqual(["please use at least 3 uppercase character(s)"]);
    });
});
