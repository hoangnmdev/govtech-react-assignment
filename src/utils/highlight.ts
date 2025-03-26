import { ITextFormat } from "../types";
export const extractHightLightByKeyword = (
  text: string,
  keyword: string
): ITextFormat[] => {
  const result: ITextFormat[] = [];
  const regex = new RegExp(keyword, "gi");
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    const matchedText = match[0];
    const beforeText = text.slice(lastIndex, match.index);
    if (beforeText) {
      result.push({ text: beforeText, type: "normal" });
    }
    result.push({ text: matchedText, type: "highlight" });
    lastIndex = match.index + matchedText.length;
  }

  if (lastIndex < text.length) {
    result.push({ text: text.slice(lastIndex), type: "normal" });
  }

  return result;
};

export const extractHighlightFromDocument = (
  text: string,
  keyword: string
): ITextFormat[] => {
  if (!keyword.trim()) return [{ text, type: "normal" }];

  const regex = new RegExp(`(${keyword})`, "gi");
  const parts = text.split(regex).filter((part) => part !== "");

  return parts.map((part) => ({
    text: part,
    type: part.toLowerCase() === keyword.toLowerCase() ? "highlight" : "normal",
  }));
};
