import {
  extractHighlightFromDocument,
  extractHightLightByKeyword,
} from "./highlight";
import { describe, expect, it } from "@jest/globals";

describe("extractHightLightByKeyword", () => {
  it("should highlight the keyword in the text", () => {
    const result = extractHightLightByKeyword("hello world", "world");
    expect(result).toEqual([
      { text: "hello ", type: "normal" },
      { text: "world", type: "highlight" },
    ]);
  });

  it("should return the entire text as normal if keyword is not found", () => {
    const result = extractHightLightByKeyword("hello world", "test");
    expect(result).toEqual([{ text: "hello world", type: "normal" }]);
  });

  it("should handle multiple occurrences of the keyword", () => {
    const result = extractHightLightByKeyword("hello world, world!", "world");
    expect(result).toEqual([
      { text: "hello ", type: "normal" },
      { text: "world", type: "highlight" },
      { text: ", ", type: "normal" },
      { text: "world", type: "highlight" },
      { text: "!", type: "normal" },
    ]);
  });

  it("should handle case-insensitive matches", () => {
    const result = extractHightLightByKeyword("Hello WORLD, world!", "world");
    expect(result).toEqual([
      { text: "Hello ", type: "normal" },
      { text: "WORLD", type: "highlight" },
      { text: ", ", type: "normal" },
      { text: "world", type: "highlight" },
      { text: "!", type: "normal" },
    ]);
  });

  it("should return an empty array for empty text", () => {
    const result = extractHightLightByKeyword("", "world");
    expect(result).toEqual([]);
  });
});

describe("extractHighlightFromDocument", () => {
  it("should highlight the keyword in the text", () => {
    const result = extractHighlightFromDocument("hello world", "world");
    expect(result).toEqual([
      { text: "hello ", type: "normal" },
      { text: "world", type: "highlight" },
    ]);
  });

  it("should return the entire text as normal if keyword is not found", () => {
    const result = extractHighlightFromDocument("hello world", "test");
    expect(result).toEqual([{ text: "hello world", type: "normal" }]);
  });

  it("should handle multiple occurrences of the keyword", () => {
    const result = extractHighlightFromDocument("hello world, world!", "world");
    expect(result).toEqual([
      { text: "hello ", type: "normal" },
      { text: "world", type: "highlight" },
      { text: ", ", type: "normal" },
      { text: "world", type: "highlight" },
      { text: "!", type: "normal" },
    ]);
  });

  it("should handle case-insensitive matches", () => {
    const result = extractHighlightFromDocument("Hello WORLD, world!", "world");
    expect(result).toEqual([
      { text: "Hello ", type: "normal" },
      { text: "WORLD", type: "highlight" },
      { text: ", ", type: "normal" },
      { text: "world", type: "highlight" },
      { text: "!", type: "normal" },
    ]);
  });

  it("should return an array with normal text if keyword is empty", () => {
    const result = extractHighlightFromDocument("hello world", "");
    expect(result).toEqual([{ text: "hello world", type: "normal" }]);
  });
});
