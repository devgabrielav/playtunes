import { createContext } from "react";

type SearchContextType = { 
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const initialValue: SearchContextType = {
  searchValue: '',
  setSearchValue: () => ''
}

export const SearchContext = createContext<SearchContextType>(initialValue);