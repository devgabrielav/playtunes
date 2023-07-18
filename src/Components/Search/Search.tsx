import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { AlbumType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';

function Search() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputandButton, setInputAndButton] = useState(true);
  const [mappedAlbuns, setMappedAlbuns] = useState(false);
  const [searchedAlbuns, setSearchedAlbuns] = useState<AlbumType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleCLick = async () => {
    setIsLoading(true);
    const albuns = await searchAlbumsAPI(inputValue);
    setInputAndButton(false);
    setSearchedAlbuns(albuns);
    setMappedAlbuns(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      {inputandButton && (
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Digite o nome do(a) artista ou banda"
            name="artist"
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ inputValue.length < 2 }
            onClick={ handleCLick }
          >
            Pesquisar
          </button>
        </div>
      )}
      {mappedAlbuns && (searchedAlbuns.length > 1 ? (
        <div>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Digite o nome do(a) artista ou banda"
            name="artist"
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            disabled={ inputValue.length < 2 }
            onClick={ handleCLick }
          >
            Pesquisar
          </button>
          <p>{`Resultado de álbuns de: ${inputValue}`}</p>
          {searchedAlbuns.map((album) => (
            <div key={ album.collectionId }>
              <img
                src={ album.artworkUrl100 }
                key={ album.collectionId }
                alt={ album.collectionName }
              />
              <p>{ album.artistName }</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                { album.collectionName }
              </Link>
            </div>
          ))}
        </div>
      ) : 'Nenhum álbum foi encontrado')}
    </div>
  );
}

export default Search;
