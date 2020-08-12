# tiny-checker

A tiny (~1KB), composable and battle-tested utility library for string validation, built in TypeScript. Typically used to check the user input in applications.

[![npm version][version-badge]][npm]
[![npm downloads][downloads-badge]][npm]
[![gzip size][size-badge]][size]
![modules][modules-badge]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

## Quick start

```js
import { checkIf } from "tiny-checker";

const input = "Some input";

console.log(checkIf(input).hasMinLength(3).not().hasDigit().isValid()); // true
```

## API

This library has several built-in validators that check for specific attributes in the string input:

-   `hasDigit(atLeast: number, errorMessage: string)`: Checks if input contains `atLeast` number of digits. Defaults to 1.

-   `hasLength(length: number, errorMessage: string)`: Checks if input has exact `length` of characters. Defaults to 0.

-   `hasMinLength(length: number, errorMessage: string)` :Checks if input has minimum `length` characters. Defaults to 1.

-   `hasMaxLength(length: number, errorMessage: string)`: Checks if input has maximum `length` characters. Defaults to 1.

-   `hasLowerCase(atLeast: number, errorMessage: string)`: Checks if input contains `atLeast` number of lower-case characters. Defaults to 1.

-   `hasUpperCase(atLeast: number, errorMessage: string)`: Checks if input contains `atLeast` number of upper-case characters. Defaults to 1.

-   `isEmail(errorMessage: string)`: Checks if input is in email format. Uses https://emailregex.com/ for validation.

-   `matches(regex: string | RegExp, errorMessage: string)`: Checks if input matches the `regex` pattern

There's also a special function called `not()` that when combined with one of the validators, it negates whatever check is going to be done by the following validator.

```js
// Checks if input doesn't contain digits
checkIf("something").not().hasDigit().isValid(); // true
```

To get the result of the validation you can use two different functions:

-   `isValid()`: Returns a `boolean` with the result of the validation
-   `hasErrors()`: Returns an array of strings with the error messages if they exist or an empty array otherwise.

## Combining multiple validators

One of the main objectives of `tiny-checker` is to provide a composable API that allows combining multiple validators in an intuitive way. If you're familiar with [jest](https://jestjs.io/) and other testing frameworks, you'll find this very similar:

```js
// Check if input is a strong password
checkIf("StrongPassword123")
    .hasMinLength(9)
    .hasMaxLength(32)
    .hasUpperCase()
    .hasLowerCase()
    .hasDigit()
    .isValid();
```

## Custom error messages

For each validation function it's possible to define custom error messages. This is useful to provide specific error messages for special situations or for using with different languages.

```js
checkIf("something").hasDigit(1, "needs to be alphanumeric").hasErrors();
// ["needs to be alphanumeric"]

checkIf("something").hasDigit(1, "não contém números").hasErrors();
// ["não contém números"]
```

By default the error messages use the function parameters where applicable. This is done by replacing the `$value` placeholder in the error message.

```js
checkIf("something").hasDigit(1).hasErrors();
// ["should have at least 1 digit(s)"]

checkIf("something")
    .hasDigit(2, "please add at least $value digit(s)")
    .hasErrors();
// ["please add at least 2 digit(s)"]
```

## Extending default behaviour

It's possible to extend the behaviour of `tiny-checker` by adding new validators, either with a custom implementation or installed from an external plugin.

To build a new validator you have access to the `TinyCheckerBase` class that provides all necessary logic to build the custom validator.

```js
import { TinyCheckerBase, defaultValidators } from "tiny-checker";

function isUpperCase<T extends TinyCheckerBase>(
    this: T,
    errorMessage: string = "should be all uppercase"
): T {
    return this._processValue(
        (this._str.match(new RegExp(/\p{Lu}/, "gu")) || []).length >=
            this._str.length,
        errorMessage
    );
}

export const { checkIf } = TinyCheckerBase.load({
    ...defaultValidators,
    isUpperCase,
});
```

This will make a new `checkIf` function available with the additional validator, fully typed and ready to be used in conjuction with the existing validators.

The reason why we also make `defaultValidators` available is because in some scenarios you might want to just use a few of the default validators so that can be done by just loading the necessary ones:

```js
import { TinyCheckerBase, defaultValidators } from "tiny-checker";

const { hasDigit, hasLength } = defaultValidators;

export const { checkIf } = TinyCheckerBase.load({
    hasDigit,
    hasLength,
});
```

Finally you can also load 3rd party validators that are available as npm packages:

```js
import { TinyCheckerBase, defaultValidators } from "tiny-checker";
import isCreditCard from "tiny-checker-cc";
import { isZipCode } from "tiny-checker-address";

export const { checkIf } = TinyCheckerBase.load({
    ...defaultValidators,
    isCreditCard,
    isZipCode,
});
```

---

## Local Development

Below is a list of commands you will probably find useful.

#### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

Your library will be rebuilt if you make edits.

#### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

#### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.

_This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx)._

[npm]: https://www.npmjs.com/package/tiny-checker
[license]: https://github.com/braposo/tiny-checker/blob/master/LICENSE
[prs]: http://makeapullrequest.com
[size]: https://unpkg.com/tiny-checker/dist/tiny-checker.cjs.production.min.js
[version-badge]: https://img.shields.io/npm/v/tiny-checker.svg?style=flat-square
[downloads-badge]: https://img.shields.io/npm/dm/tiny-checker.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/tiny-checker.svg?style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/tiny-checker/dist/tiny-checker.cjs.production.min.js?compression=gzip&style=flat-square
[modules-badge]: https://img.shields.io/badge/module%20formats-cjs%2C%20esm-green.svg?style=flat-square
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[coverage-badge]: https://img.shields.io/codecov/c/github/braposo/tiny-checker.svg?style=flat-square
[coverage]: https://codecov.io/github/braposo/tiny-checker
