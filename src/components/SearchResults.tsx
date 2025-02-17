import { AlbumType } from "../types/AlbumType";

type SearchResultsType = {
  albums: AlbumType[];
  searchValue: string;
}

function SearchResults({ albums, searchValue }: SearchResultsType) {

  if (albums.length === 0) {
    return <h1>Nenhum álbum foi encontrado</h1>
  }
  return (
    <>
    <h1>Resultado de álbuns de: { searchValue }</h1>
      { albums.map((album) => (
        <div key={ album.collectionId } >
          <p>{ album.collectionName }</p>
          <a href={ `/album/${ album.collectionId }` }>
            <img src={ album.artworkUrl100 } alt="Album Cover" />
          </a>
        </div>
      )) }
    </>
  )
}

export default SearchResults;