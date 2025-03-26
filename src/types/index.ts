export interface IHighlight {
  BeginOffset: number;
  EndOffset: number;
}

export interface ITextFormat {
  text: string;
  type: "highlight" | "normal";
}

export interface ISearchResultItem {
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: IHighlight[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: IHighlight[];
  };
  DocumentURI: string;
}

export interface ISearchResultResponse {
  Page: number;
  PageSize: number;
  TotalNumberOfResults: number;
  ResultItems: ISearchResultItem[];
}

export interface ISearchSuggestionResponse {
  stemmedQueryTerm: string;
  suggestions: string[];
}
