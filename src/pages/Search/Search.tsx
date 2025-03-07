import { useContext, useState } from "react";
import searchAlbumsAPI from "../../utils/searchAlbumsAPI";
import { AlbumType } from "../../types/AlbumType";
import SearchResults from "../../components/SearchResults";
import Loading from "../../components/Loading/Loading";
import SearchForm from "../../components/SearchForm";
import { SearchContext } from "../../context/SearchContext";

type SearchType = {
  albums: AlbumType[];
  searchValue: string;
}

function Search() {
  const [loading, setLoading] = useState<boolean>(false);
  const { searchValue, setSearchValue } = useContext(SearchContext);
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

  if (loading) {
    return <Loading />
  }

  return (
    <>
      {showResults ? (
        <div>
          <SearchForm search={ search } />
          <SearchResults albums={ searchResults.albums } searchValue={ searchResults.searchValue } />
        </div>
      ) : (
        <SearchForm search={ search } />
      )}
    </>
  )
}

export default Search;