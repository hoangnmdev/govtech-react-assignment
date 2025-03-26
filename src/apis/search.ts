import {
  filterSearchResult,
  filterSearchSuggestion,
} from "../mock/mock-filter";
import { ISearchResultResponse, ISearchSuggestionResponse } from "../types";

const searchAPIEndpoint =
  "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json";

const suggestionAPIEndpoint =
  "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json";

/**
 * Fetch search result from API and apply mock filter
 * @param keyword - search keyword
 * @returns filtered search result or error
 */
export const fetchSearchResult = async (keyword: string) => {
  try {
    const response = await fetch(searchAPIEndpoint);
    const result: ISearchResultResponse = await response.json();
    return { error: null, data: filterSearchResult(result, keyword) };
  } catch (error) {
    return { error, data: null };
  }
};
/**
 * Query search suggestion from API and apply mock filter
 * @param query  - search query
 * @returns query result or error
 */
export async function fetchSearchSuggestion(
  query: string
): Promise<{ error: unknown; data: ISearchSuggestionResponse | null }> {
  try {
    const response = await fetch(suggestionAPIEndpoint);
    const data: ISearchSuggestionResponse = await response.json();
    const filteredData = filterSearchSuggestion(data, query);
    return { error: null, data: filteredData };
  } catch (error) {
    return { error, data: null };
  }
}
