import { render, screen } from "@testing-library/react";
import SearchResult from ".";
import { ISearchResultItem } from "../../types";
import { describe, expect, it } from "@jest/globals";
import {jest } from "@jest/globals";
import { ITextFormat } from "../../types";
import "@testing-library/jest-dom/jest-globals";

jest.mock("../../utils/highlight", () => ({
  extractHighlightFromDocument: jest.fn((text) => [{ text, highlight: false }]),
}));

jest.mock("../common/HighLightText", () => ({ textFormats }: { textFormats: ITextFormat[] }) => (
  <span>{textFormats.map((format: ITextFormat, index: number) => <span key={index}>{format.text}</span>)}</span>
));

describe("SearchResult Component", () => {
  const mockSearchResults: ISearchResultItem[] = [
    {
      DocumentId: "1",
      DocumentTitle: { Text: "Test Document Title", Highlights: [] },
      DocumentExcerpt: { Text: "Test Document Excerpt", Highlights: [] },
      DocumentURI: "https://example.com/document1",
    },
    {
      DocumentId: "2",
      DocumentTitle: { Text: "Another Test Document", Highlights: [] },
      DocumentExcerpt: { Text: "Excerpt for second document", Highlights: [] },
      DocumentURI: "https://example.com/document2",
    },
  ];

  it("renders the correct number of search results", () => {
    render(<SearchResult item={mockSearchResults} total={2} page={1} pageSize={10} searchKeyword="Test" />);

    expect(screen.getByText("Showing 1 to 2 of 2 results")).toBeInTheDocument();
    expect(screen.getByText("Test Document Title")).toBeInTheDocument();
    expect(screen.getByText("Another Test Document")).toBeInTheDocument();
  });

  it("displays search result details correctly", () => {
    render(<SearchResult item={mockSearchResults} total={2} page={1} pageSize={10} searchKeyword="Test" />);

    expect(screen.getByText("Test Document Title")).toBeInTheDocument();
    expect(screen.getByText("Test Document Excerpt")).toBeInTheDocument();
    expect(screen.getByText("Another Test Document")).toBeInTheDocument();
    expect(screen.getByText("Excerpt for second document")).toBeInTheDocument();
  });

  it("renders hyperlinks correctly", () => {
    render(<SearchResult item={mockSearchResults} total={2} page={1} pageSize={10} searchKeyword="Test" />);

    expect(screen.getByText("Test Document Title").closest("a")).toHaveAttribute("href", "https://example.com/document1");
    expect(screen.getByText("Another Test Document").closest("a")).toHaveAttribute("href", "https://example.com/document2");
  });

  it("renders 'No results found' when no items are present", () => {
    render(<SearchResult item={[]} total={0} page={1} pageSize={10} searchKeyword="Test" />);

    expect(screen.getByText("No results found.")).toBeInTheDocument();
  });
});
