import type { LeftJustifyOptions } from "./types.js";
import { DEFAULT_OPTIONS } from "./types.js";

const segmenter = new Intl.Segmenter();

const graphemeCount = (str: string): number =>
  Array.from(segmenter.segment(str)).length;

const validateFillChar = (fillChar: string): void => {
  if (graphemeCount(fillChar) !== 1) {
    throw new TypeError(`fillChar must be exactly one character, got: ${JSON.stringify(fillChar)}`);
  }
};

/**
 * Pad `str` on the right with `fillChar` until it reaches `width`.
 * Returns `str` unchanged if it already meets or exceeds `width`.
 * Width and character counting are grapheme-cluster-aware (via Intl.Segmenter).
 */
export const leftJustify = (
  str: string,
  width: number,
  options: Partial<LeftJustifyOptions> = {}
): string => {
  const { fillChar } = { ...DEFAULT_OPTIONS, ...options };
  validateFillChar(fillChar);

  const len = graphemeCount(str);
  return len >= width ? str : str + fillChar.repeat(width - len);
};

/**
 * Pad each string in `lines` on the right so all have the same length
 * (the length of the longest entry). Returns a new array; input is untouched.
 */
export const leftJustifyLines = (
  lines: readonly string[],
  options: Partial<LeftJustifyOptions> = {}
): readonly string[] => {
  if (lines.length === 0) return [];

  const width = lines.reduce(
    (max, line) => Math.max(max, graphemeCount(line)),
    0
  );

  return lines.map((line) => leftJustify(line, width, options));
};

/**
 * Left-justify every line in a newline-separated block of text.
 * All lines are padded to the width of the longest line.
 */
export const leftJustifyBlock = (
  text: string,
  options: Partial<LeftJustifyOptions> = {}
): string => leftJustifyLines(text.split("\n"), options).join("\n");
