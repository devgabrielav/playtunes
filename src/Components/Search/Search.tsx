import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { AlbumType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './Search.css';
import circleX from './circleError.png';

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

  const handleSearch = async () => {
    setIsLoading(true);
    const albuns = await searchAlbumsAPI(inputValue);
    setInputAndButton(false);
    setSearchedAlbuns(albuns);
    setMappedAlbuns(true);
    setIsLoading(false);
  };

  const handleCLick = async () => {
    await handleSearch();
  };

  const handleEnterPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="loadingSearch">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {inputandButton && (
        <div className="searchMain">
          <div className="inputArtist">
            <input
              type="text"
              data-testid="search-artist-input"
              placeholder="Digite o nome do(a) artista ou banda"
              name="artist"
              onChange={ handleChange }
              onKeyDown={ handleEnterPress }
              className="pesquisador"
            />
          </div>
          <button
            data-testid="search-artist-button"
            disabled={ inputValue.length < 2 }
            onClick={ handleCLick }
            className="pesquisaB"
          >
            Pesquisar
          </button>
        </div>
      )}
      {mappedAlbuns && (searchedAlbuns.length > 1 ? (
        <div>
          <div className="searchMain">
            <div className="inputArtist">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Digite o nome do(a) artista ou banda"
                name="artist"
                onChange={ handleChange }
                className="pesquisador"
                onKeyDown={ handleEnterPress }
              />
            </div>
            <button
              data-testid="search-artist-button"
              disabled={ inputValue.length < 2 }
              onClick={ handleCLick }
              className="pesquisaB"
            >
              Pesquisar
            </button>
          </div>
          <p className="defaultText">{`Resultado de álbuns de: ${inputValue}`}</p>
          <div className="albunsDiv">
            {searchedAlbuns.map((album) => (
              <div key={ album.collectionId } className="cover">
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  className="albumName"
                >
                  <img
                    src={ album.artworkUrl100 }
                    key={ album.collectionId }
                    alt={ album.collectionName }
                    className="imageCover"
                  />
                  {album.collectionName}
                </Link>
                <p className="artistName">{album.artistName}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="searchMain">
            <div className="inputArtist">
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Digite o nome do(a) artista ou banda"
                name="artist"
                onChange={ handleChange }
                className="pesquisador"
                onKeyDown={ handleEnterPress }
              />
            </div>
            <button
              data-testid="search-artist-button"
              disabled={ inputValue.length < 2 }
              onClick={ handleCLick }
              className="pesquisaB"
            >
              Pesquisar
            </button>
          </div>
          <div className="nothingFound">
            <img src={ circleX } alt="" />
            <p>Nenhum álbum foi encontrado</p>
          </div>
        </div>
      ))}
    </div>

  );
}

export default Search;
