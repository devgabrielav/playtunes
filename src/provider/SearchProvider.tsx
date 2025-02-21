import { useState } from "react";
import { SearchContext } from "../context/SearchContext";

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <SearchContext.Provider value={ { searchValue, setSearchValue } }>
      { children }
    </SearchContext.Provider>
  )
}

export default SearchProvider;