import { ISearchResultResponse } from "../types";
import { ISearchSuggestionResponse } from "../types";

export const filterSearchResult = (
  result: ISearchResultResponse,
  keyword: string
) => {
  result.ResultItems = result.ResultItems.filter((resultItem) =>
    resultItem.DocumentTitle.Text.toLocaleLowerCase().includes(
      keyword.toLocaleLowerCase()
    )
  );
  result.TotalNumberOfResults = result.ResultItems.length;
  return result;
};

export const filterSearchSuggestion = (
  result: ISearchSuggestionResponse,
  keyword: string
) => {
  result.suggestions = result.suggestions.filter((suggestion) =>
    suggestion.includes(keyword)
  );
  return result;
};
