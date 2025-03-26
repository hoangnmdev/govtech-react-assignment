import HighlightText from "../common/HighLightText";
import { ISearchResultItem } from "../../types";
import { extractHighlightFromDocument } from "../../utils/highlight";

interface ISearchResultProps {
  item: ISearchResultItem[];
  total: number;
  page: number;
  pageSize: number;
  searchKeyword: string;
}

const SearchResult = (props: ISearchResultProps) => {
  const { item, total, page, pageSize, searchKeyword } = props;
  const firstIemIndex = (page - 1) * pageSize + 1;
  const lastItemIndex = Math.min(page * pageSize, total);

  return (
    <div className="w-4/5">
      {item.length ? (
        <>
          <div className="font-semibold my-10 text-lg">
            {`Showing ${firstIemIndex} to ${lastItemIndex} of ${total} results`}
          </div>

          <div className="flex text-lg flex-col gap-12">
            {item &&
              item.map((searchItem) => (
                <div key={searchItem.DocumentId}>
                  <div className="text-lg font-semibold">
                    <a href={searchItem.DocumentURI} className="text-blue-500">
                      <HighlightText
                        textFormats={extractHighlightFromDocument(
                          searchItem.DocumentTitle.Text,
                          searchKeyword
                        )}
                      />
                    </a>
                    <div className="text-base font-normal text-gray-500">
                      <HighlightText
                        textFormats={extractHighlightFromDocument(
                          searchItem.DocumentExcerpt.Text,
                          searchKeyword
                        )}
                      />
                    </div>
                    <a
                      className="text-sm font-normal text-gray-500 break-all"
                      href={searchItem.DocumentURI}
                    >
                      {searchItem.DocumentURI}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="text-sm text-gray-500 mt-5">No results found.</div>
      )}
    </div>
  );
};

export default SearchResult;
