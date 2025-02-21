import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

type SearchFormType = {
  search: (event: React.FormEvent<HTMLFormElement>) => void;
}

function SearchForm({ search }: SearchFormType) {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <form onSubmit={ search }>
      <input type="text" onChange={ (e) => setSearchValue(e.target.value) } />
      <button disabled={ searchValue.length >= 2 ? false : true }>Search</button>
    </form>
  )
}

export default SearchForm;