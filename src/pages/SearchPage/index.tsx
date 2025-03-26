import SearchBox from "../../components/SearchBox";
import SearchPageBanner from "../../components/SearchPageBanner";
import SearchResult from "../../components/SearchResult/index";
import { fetchSearchResult } from "../../apis/search";
import { ISearchResultResponse } from "../../types/index";
import { useState } from "react";
const SearchPage = () => {
  const [searchResult, setSearchResult] =
    useState<ISearchResultResponse | null>(null);
  const [error, setError] = useState<unknown | null>();
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const onSearch = async (keyword: string) => {
    fetchSearchResult(keyword).then(({ error, data }) => {
      setSearchKeyword(keyword);
      setError(error);
      setSearchResult(data);
    });
  };
  return (
    <>
      <div className="shadow-lg sticky top-0 z-20 bg-white">
        <SearchPageBanner />
        <div className="flex justify-center py-10 w-4/5 mx-auto">
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
      <div className="pb-10 w-4/5 mx-auto">
        {searchResult && (
          <SearchResult
            item={searchResult.ResultItems}
            total={searchResult.TotalNumberOfResults}
            page={searchResult.Page}
            pageSize={searchResult.PageSize}
            searchKeyword={searchKeyword}
          />
        )}
        {!!error && (
          <div className="text-red-500 text-center mt-5">
            Network error. Please try again later!
          </div>
        )}
      </div>
    </>
  );
};
export default SearchPage;
