import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { AlbumType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import './Search.css';
import circleX from './circleError.png';

function Search() {
  const inputValue = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchedAlbuns, setSearchedAlbuns] = useState<AlbumType[]>([]);
  const [previousSearch, setPreviousSearch] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    inputValue.current = value;    
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const albuns = await searchAlbumsAPI(inputValue.current);
    setSearchedAlbuns(albuns);
    setSearched(true);
    setIsLoading(false);
    setPreviousSearch(inputValue.current);
    inputValue.current = '';
    setSearched(true);
  };

  if (isLoading) {
    return (
      <div className="searchMain">
        <Loading />
      </div>
    );
  }

  return (
    <div className="mainDiv">
        <form className="searchMain" onSubmit={ handleSearch }>
          <div className="inputArtist">
            <input
              type="text"
              placeholder="Type the artist or band name"
              name="artist"
              onChange={ handleChange }
              className="pesquisador"
            />
          </div>
          <button className="pesquisaB">
            Pesquisar
          </button>
        </form>
      {searched && (searchedAlbuns.length > 1 ? (
          <div className="albunsDiv">
          <p className="defaultText">{`Resultado de álbuns de: ${previousSearch}`}</p>
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
      ) : (
          <div className="nothingFound">
            <img src={ circleX } alt="" />
            <p>Nenhum álbum foi encontrado</p>
          </div>
      ))}
    </div>
  );
}

export default Search;
