import { fetchSearchResult, fetchSearchSuggestion } from "./search";
import {
  filterSearchResult,
  filterSearchSuggestion,
} from "../mock/mock-filter";
import { describe, expect, it, beforeEach, afterEach } from "@jest/globals";
import { jest } from "@jest/globals";
import { ISearchResultResponse, ISearchSuggestionResponse } from "../types";

jest.mock("../mock/mock-filter", () => ({
  filterSearchResult: jest.fn(),
  filterSearchSuggestion: jest.fn(),
}));

describe("fetchSearchResult", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return filtered search results when API request is successful", async () => {
    const mockData: ISearchResultResponse = {
      Page: 1,
      PageSize: 10,
      TotalNumberOfResults: 1,
      ResultItems: [
        {
          DocumentId: "1",
          DocumentTitle: {
            Text: "Test result",
            Highlights: [],
          },
          DocumentExcerpt: {
            Text: "This is a test result excerpt.",
            Highlights: [],
          },
          DocumentURI: "http://example.com/test-result",
        },
      ],
    };

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockData,
    } as Partial<Response> as Response);

    (filterSearchResult as jest.Mock).mockReturnValue([
      { id: 1, title: "Filtered result" },
    ]);

    const result = await fetchSearchResult("test");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("queryResult.json")
    );
    expect(filterSearchResult).toHaveBeenCalledWith(mockData, "test");
    expect(result).toEqual({
      error: null,
      data: [{ id: 1, title: "Filtered result" }],
    });
  });

  it("should return an error if the API request fails", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(
      new Error("Network error")
    );

    const result = await fetchSearchResult("test");

    expect(fetch).toHaveBeenCalled();
    expect(result).toEqual({ error: expect.any(Error), data: null });
  });
});

describe("fetchSearchSuggestion", () => {
  beforeEach(() => {
    global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return filtered search suggestions when API request is successful", async () => {
    const mockData: ISearchSuggestionResponse = {
      stemmedQueryTerm: "test",
      suggestions: ["Test suggestion"],
    };

    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as Response);

    (filterSearchSuggestion as jest.Mock).mockReturnValue([
      "Filtered suggestion",
    ]);

    const result = await fetchSearchSuggestion("test");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("suggestion.json")
    );
    expect(filterSearchSuggestion).toHaveBeenCalledWith(mockData, "test");
    expect(result).toEqual({ error: null, data: ["Filtered suggestion"] });
  });

  it("should return an error if the API request fails", async () => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValue(
      new Error("Network error")
    );

    const result = await fetchSearchSuggestion("test");

    expect(fetch).toHaveBeenCalled();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.data).toBeNull();
  });
});
