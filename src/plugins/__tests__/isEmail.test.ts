import { isEmail } from "../isEmail";
import { TinyCheckerBase } from "src/base";

const { checkIf } = TinyCheckerBase.load({ isEmail });

describe("isEmail", () => {
    it("should validate with simple email", () => {
        expect(checkIf("email@example.com").isEmail().isValid()).toBe(true);

        expect(checkIf("bademail@example").isEmail().isValid()).toBe(false);
    });

    it("should validate with special emails", () => {
        expect(checkIf("email.other@example23.gz").isEmail().isValid()).toBe(
            true
        );

        expect(checkIf("bad%#%&//(email@example.com").isEmail().isValid()).toBe(
            false
        );
    });

    it("should validate when using not()", () => {
        expect(checkIf("bademail@example").not().isEmail().isValid()).toBe(
            true
        );

        expect(checkIf("email@example.com").not().isEmail().isValid()).toBe(
            false
        );
    });

    it("should validate with error message", () => {
        expect(checkIf("email@example.com").isEmail().hasErrors()).toEqual([]);

        expect(
            checkIf("bad%#%&//(email@example.com").isEmail().hasErrors()
        ).toEqual(["should be a valid email address"]);

        expect(
            checkIf("bad%#%&//(email@example.com")
                .isEmail("that doesn't look like a valid email!")
                .hasErrors()
        ).toEqual(["that doesn't look like a valid email!"]);
    });
});
