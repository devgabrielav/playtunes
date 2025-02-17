import { useContext, useState } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import Loading from "../../components/Loading";
import searchAlbumsAPI from "../../utils/searchAlbumsAPI";
import { AlbumType } from "../../types/AlbumType";
import SearchResults from "../../components/SearchResults";

type SearchType = {
  albums: AlbumType[];
  searchValue: string;
}

function Search() {
  const { setLoading } = useContext(LoadingContext);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchType>({albums: [], searchValue: ''});
  const [showResults, setShowResults] = useState<boolean>(false);

  const search = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentSearchValue = searchValue;
    setShowResults(false);
    setLoading(true);
    const results = await searchAlbumsAPI(searchValue);
    setSearchResults({ albums: results, searchValue: currentSearchValue });
    setShowResults(true)
    setSearchValue('');
    setLoading(false);
  }

  return (
    <>
      {showResults ? (
        <SearchResults albums={ searchResults.albums } searchValue={ searchResults.searchValue } />
      ) : (
      <form action="" onSubmit={ search }>
        <input type="text" onChange={ (e) => setSearchValue(e.target.value) } />
        <button disabled={ searchValue.length >= 2 ? false : true }>Search</button>
      </form>
      )}
    </>
  )
}

export default Search;