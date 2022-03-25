# textlint-rule-pic-only



## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-pic-only

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "pic-only": true
    }
}
```

Via CLI

```
textlint --rule pic-only README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

ISC © 
