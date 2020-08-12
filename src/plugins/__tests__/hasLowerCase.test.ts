import { hasLowerCase } from "../hasLowerCase";
import { TinyCheckerBase } from "src";

const { checkIf } = TinyCheckerBase.load({ hasLowerCase });

describe("hasLowerCase", () => {
    it("should validate with default case", () => {
        expect(checkIf("aSD").hasLowerCase().isValid()).toBe(true);

        expect(checkIf("ASD").hasLowerCase().isValid()).toBe(false);
    });

    it("should validate with custom number", () => {
        expect(checkIf("Asd").hasLowerCase(2).isValid()).toBe(true);

        expect(checkIf("aSD").hasLowerCase(2).isValid()).toBe(false);
    });

    it("should validate with non-latin letters", () => {
        expect(checkIf("Aíç").hasLowerCase().isValid()).toBe(true);

        expect(checkIf("AÍÇ").hasLowerCase(2).isValid()).toBe(false);
    });

    it("should validate when using not()", () => {
        expect(checkIf("ASD").not().hasLowerCase().isValid()).toBe(true);

        expect(checkIf("aSd").not().hasLowerCase().isValid()).toBe(false);
    });

    it("should validate with error message", () => {
        expect(checkIf("aSd").hasLowerCase().hasErrors()).toEqual([]);

        expect(checkIf("AsD").hasLowerCase(3).hasErrors()).toEqual([
            "should have at least 3 lowercase character(s)",
        ]);

        expect(
            checkIf("AsD")
                .hasLowerCase(
                    3,
                    "please use at least $value lowercase character(s)"
                )
                .hasErrors()
        ).toEqual(["please use at least 3 lowercase character(s)"]);
    });
});
