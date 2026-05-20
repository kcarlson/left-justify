# left-justify

> Pad strings on the right to a fixed width — the complement of `left-pad`.

[![npm](https://img.shields.io/npm/v/left-justify)](https://www.npmjs.com/package/left-justify)
[![CI](https://github.com/kcarlson/left-justify/actions/workflows/ci.yml/badge.svg)](https://github.com/kcarlson/left-justify/actions)

## Install

```sh
npm install left-justify
```

## API

### `leftJustify(str, width, options?)`

Pad `str` on the right with `fillChar` (default `' '`) until it reaches `width`. Returns `str` unchanged if it already meets or exceeds `width`.

```ts
import { leftJustify } from "left-justify";

leftJustify("hi",    5)              // "hi   "
leftJustify("hello", 5)              // "hello"
leftJustify("toolong", 3)            // "toolong"  (no truncation)
leftJustify("hi",    5, { fillChar: "-" })  // "hi---"
```

### `leftJustifyLines(lines, options?)`

Pad each string in `lines` on the right so all have the same length (the widest entry). Returns a new array; the original is untouched.

```ts
import { leftJustifyLines } from "left-justify";

leftJustifyLines(["cat", "elephant", "ox"])
// ["cat     ", "elephant", "ox      "]
```

### `leftJustifyBlock(text, options?)`

Left-justify every line in a newline-separated block of text.

```ts
import { leftJustifyBlock } from "left-justify";

leftJustifyBlock("cat\nelephant\nox")
// "cat     \nelephant\nox      "
```

### Options

| Option     | Type     | Default | Description                              |
|------------|----------|---------|------------------------------------------|
| `fillChar` | `string` | `' '`   | Single character used for right-padding  |

`fillChar` must be exactly one character (Unicode-aware); passing an empty string or multi-character string throws a `TypeError`.

## Notes

- Unicode-safe: character width is counted by codepoint, not byte length (`"😀"` counts as 1).
- Pure functions: no side effects, immutable inputs never modified.
- Zero dependencies.

## License

MIT
