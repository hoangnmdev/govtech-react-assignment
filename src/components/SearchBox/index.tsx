import React, { useState, useRef, useLayoutEffect } from "react";
import { Search } from "lucide-react";
import { extractHightLightByKeyword } from "../../utils/highlight";
import HighlightText from "../common/HighLightText";
import { useDebounce } from "../../hook/UseDebounce/useDebounce";
import { useOutsideClick } from "../../hook/UseOutsideClick/useOutsideClick";
import { useSearchSuggestions } from "../../hook/UseSearchSuggesion/useSearchSugession"
interface SearchBoxProps {
  onSearch: (keyword: string) => Promise<void>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const { suggestions, showSuggestions, setShowSuggestions } =
    useSearchSuggestions(debouncedSearchTerm);

  useLayoutEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useOutsideClick(suggestionsRef, () => setShowSuggestions(false));

  const handleSearch = () => {
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        if (
          activeSuggestionIndex >= 0 &&
          activeSuggestionIndex <= suggestions.length
        ) {
          handleSuggestionClick(suggestions[activeSuggestionIndex]);
        } else {
          handleSearch();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1
        );
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0
        );
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full mx-auto flex relative">
      <div className="relative w-full">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchTerm && setShowSuggestions(true)}
            placeholder="Search..."
            className="w-full px-4 py-2 outline-none text-base"
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 px-2"
            >
              ×
            </button>
          )}
        </div>
        {showSuggestions && suggestions.length > 0 && searchTerm.length > 2 && (
          <div
            ref={suggestionsRef}
            className="absolute left-0 w-full bg-white border border-gray-300 mt-1 rounded-md shadow-lg z-10"
          >
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 ${
                    index === activeSuggestionIndex ? "bg-gray-200" : ""
                  }`}
                >
                  <HighlightText
                    textFormats={extractHightLightByKeyword(
                      suggestion,
                      searchTerm
                    )}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center justify-center cursor-pointer"
      >
        <Search className="h-5 w-5" />
        <span className="ml-2 hidden sm:inline">Search</span>
      </button>
    </div>
  );
};

export default SearchBox;
