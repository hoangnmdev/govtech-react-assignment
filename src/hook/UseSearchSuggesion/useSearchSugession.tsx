import { useEffect, useState } from "react";
import suggestion from "../../mock/data/suggestions.json";

export const useSearchSuggestions = (searchTerm: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm?.trim() !== "") {
      const filteredSuggestions = suggestion.suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  return { suggestions, showSuggestions, setShowSuggestions };
};
