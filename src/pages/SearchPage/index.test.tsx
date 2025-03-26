import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchPage from "../SearchPage";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { jest } from "@jest/globals";
import { ISearchResultResponse } from "../../types/index";
import { fetchSearchResult } from "../../apis/search";
import '@testing-library/jest-dom/jest-globals';

const mockSearchResultData: ISearchResultResponse = {
  ResultItems: [
    {
      DocumentId: "1",
      DocumentTitle: { Text: "Test Title", Highlights: [] },
      DocumentExcerpt: { Text: "Test Excerpt", Highlights: [] },
      DocumentURI: "http://example.com",
    },
  ],
  TotalNumberOfResults: 1,
  Page: 1,
  PageSize: 10,
};

const fetchSearchResultMock = fetchSearchResult as unknown as jest.MockedFunction<typeof fetchSearchResult>;

jest.mock("../../services/search.ts", () => ({
  fetchSearchResult: jest.fn(() =>
    Promise.resolve({ error: null, data: mockSearchResultData })
  ),
}));

describe("SearchPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders SearchPageBanner and SearchBox initially", () => {
    render(<SearchPage />);
    expect(
      screen.getByText(/An Official Website of the/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders SearchResult on successful search", async () => {
    fetchSearchResultMock.mockResolvedValue({
      error: null,
      data: mockSearchResultData,
    });

    render(<SearchPage />);
    const input = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText((_content, element) => {
        return element?.textContent === "Test Title";
      })).toBeInTheDocument();
    });
  });

  it("renders error message on failed search", async () => {
    fetchSearchResultMock.mockResolvedValue({
      error: new Error("Network error"),
      data: null,
    });

    render(<SearchPage />);
    const input = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button", { name: /Search/i });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(
        screen.getByText("Network error. Please try again later!")
      ).toBeInTheDocument();
    });
  });
});