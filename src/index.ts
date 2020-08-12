import { TinyCheckerBase } from "./base";
import { hasDigit } from "./plugins/hasDigit";
import { hasLength } from "./plugins/hasLength";
import { hasMinLength } from "./plugins/hasMinLength";
import { hasMaxLength } from "./plugins/hasMaxLength";
import { hasLowerCase } from "./plugins/hasLowerCase";
import { hasUpperCase } from "./plugins/hasUpperCase";
import { isEmail } from "./plugins/isEmail";
import { matches } from "./plugins/matches";

// Export base class to load external plugins
export { TinyCheckerBase } from "./base";

// Export default validators so they can be reused
export const defaultValidators = {
    hasDigit,
    hasLength,
    hasMinLength,
    hasMaxLength,
    hasLowerCase,
    hasUpperCase,
    isEmail,
    matches,
};

const TinyChecker = TinyCheckerBase.load(defaultValidators);

// Export main function to use in client
export const { checkIf } = TinyChecker;
