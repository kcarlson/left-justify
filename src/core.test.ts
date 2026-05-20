import { describe, it, expect } from "vitest";
import { leftJustify, leftJustifyLines, leftJustifyBlock } from "./core.js";

describe("leftJustify", () => {
  const cases: readonly {
    label: string;
    str: string;
    width: number;
    options?: { fillChar: string };
    expected: string;
  }[] = [
    { label: "pads short string", str: "hi", width: 5, expected: "hi   " },
    { label: "exact width — no change", str: "hello", width: 5, expected: "hello" },
    { label: "exceeds width — no truncation", str: "toolong", width: 3, expected: "toolong" },
    { label: "empty string pads to width", str: "", width: 4, expected: "    " },
    { label: "width zero — no change", str: "x", width: 0, expected: "x" },
    { label: "custom fill char", str: "hi", width: 5, options: { fillChar: "-" }, expected: "hi---" },
    { label: "unicode multibyte char counted as 1", str: "é", width: 3, expected: "é  " },
    { label: "emoji (multibyte) counted as 1 grapheme", str: "😀", width: 3, expected: "😀  " },
    { label: "already at exact width with custom fill", str: "ok", width: 2, options: { fillChar: "." }, expected: "ok" },
  ];

  for (const { label, str, width, options, expected } of cases) {
    it(label, () => {
      expect(leftJustify(str, width, options)).toBe(expected);
    });
  }

  it("throws for multi-char fillChar", () => {
    expect(() => leftJustify("x", 5, { fillChar: "ab" })).toThrow(TypeError);
  });

  it("throws for empty fillChar", () => {
    expect(() => leftJustify("x", 5, { fillChar: "" })).toThrow(TypeError);
  });
});

describe("leftJustifyLines", () => {
  const cases: readonly {
    label: string;
    lines: readonly string[];
    options?: { fillChar: string };
    expected: readonly string[];
  }[] = [
    {
      label: "pads shorter lines to match longest",
      lines: ["cat", "elephant", "ox"],
      expected: ["cat     ", "elephant", "ox      "],
    },
    {
      label: "empty array returns empty array",
      lines: [],
      expected: [],
    },
    {
      label: "single-element array — no padding needed",
      lines: ["only"],
      expected: ["only"],
    },
    {
      label: "all equal-length lines — unchanged",
      lines: ["ab", "cd", "ef"],
      expected: ["ab", "cd", "ef"],
    },
    {
      label: "custom fill char",
      lines: ["a", "bbb"],
      options: { fillChar: "." },
      expected: ["a..", "bbb"],
    },
    {
      label: "includes empty string",
      lines: ["hi", ""],
      expected: ["hi", "  "],
    },
  ];

  for (const { label, lines, options, expected } of cases) {
    it(label, () => {
      expect(leftJustifyLines(lines, options)).toEqual(expected);
    });
  }

  it("does not mutate the input array", () => {
    const input = ["a", "bbb"];
    const frozen = Object.freeze([...input]);
    const result = leftJustifyLines(frozen);
    expect(result).not.toBe(frozen);
    expect(frozen[0]).toBe("a");
  });
});

describe("leftJustifyBlock", () => {
  const cases: readonly {
    label: string;
    text: string;
    options?: { fillChar: string };
    expected: string;
  }[] = [
    {
      label: "multi-line block",
      text: "cat\nelephant\nox",
      expected: "cat     \nelephant\nox      ",
    },
    {
      label: "single-line text — no change",
      text: "hello",
      expected: "hello",
    },
    {
      label: "empty string — no change",
      text: "",
      expected: "",
    },
    {
      label: "trailing newline creates empty last line",
      text: "hi\n",
      expected: "hi\n  ",
    },
    {
      label: "custom fill char",
      text: "a\nbbb",
      options: { fillChar: "-" },
      expected: "a--\nbbb",
    },
  ];

  for (const { label, text, options, expected } of cases) {
    it(label, () => {
      expect(leftJustifyBlock(text, options)).toBe(expected);
    });
  }
});
