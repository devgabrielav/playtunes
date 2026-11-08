import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MusicCard from '../MusicCard/MusicCard';
import { AlbumType, SongType } from '../../types';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import { getUser } from '../../services/userAPI';
import './Search.css';
import circleX from '/assets/circleError.png';

type SuggestedArtist = {
  name: string;
  genre: string;
  tag: string;
  image: string;
};

const SUGGESTED_ARTISTS: SuggestedArtist[] = [
  {
    name: 'Queen',
    genre: 'Classic Rock',
    tag: 'Lendas do Rock',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/86/92/dd86925d-484d-8ee7-3985-ef3264214269/602527644264.jpg/300x300bb.jpg',
  },
  {
    name: 'Dua Lipa',
    genre: 'Pop / Dance',
    tag: 'Em Alta',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/300x300bb.jpg',
  },
  {
    name: 'The Weeknd',
    genre: 'R&B / Synthpop',
    tag: 'Top Global',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/15/c7/55/15c755bc-7603-3ce3-e243-e59f1f9863ea/602527724171.jpg/300x300bb.jpg',
  },
  {
    name: 'Coldplay',
    genre: 'Alternative / Pop Rock',
    tag: 'Essenciais',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b0/ca/05/b0ca05aa-29c9-4e01-5a16-f6fa06bce05c/602527594347.jpg/300x300bb.jpg',
  },
  {
    name: 'Bruno Mars',
    genre: 'Funk / Pop / Soul',
    tag: 'Hits',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c1/54/2d/c1542d45-c6c2-12ca-7308-6eacd762c562/190295807870.jpg/300x300bb.jpg',
  },
  {
    name: 'Arctic Monkeys',
    genre: 'Indie Rock',
    tag: 'Favoritos Indie',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/62/2e/97/622e97c4-d620-2ae1-2a47-a32e16a01492/602567988847.jpg/300x300bb.jpg',
  },
];

const INITIAL_SUGGESTED_SONGS: SongType[] = [
  {
    trackId: 6781023657,
    trackName: 'Bohemian Rhapsody',
    artistName: 'Queen',
    collectionName: 'A Night At The Opera',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bb/4e/34/bb4e34c4-4ab4-3e20-f540-ab21d4ffaeec/mzaf_4435862130650849095.plus.aac.p.m4a',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/86/92/dd86925d-484d-8ee7-3985-ef3264214269/602527644264.jpg/100x100bb.jpg',
  },
  {
    trackId: 1538003843,
    trackName: 'Levitating',
    artistName: 'Dua Lipa',
    collectionName: 'Future Nostalgia',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/59/dc/4d/59dc4dda-93ff-8f1c-c536-f005f6ea6af5/mzaf_3066686759813252385.plus.aac.p.m4a',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/100x100bb.jpg',
  },
  {
    trackId: 6781080305,
    trackName: 'Another One Bites The Dust',
    artistName: 'Queen',
    collectionName: 'Greatest Hits',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e4/25/66/e42566d0-33f0-5650-ca09-50e190a4a59c/mzaf_12362097040607209924.plus.aac.p.m4a',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b0/ca/05/b0ca05aa-29c9-4e01-5a16-f6fa06bce05c/602527594347.jpg/100x100bb.jpg',
  },
  {
    trackId: 1228739609,
    trackName: 'New Rules',
    artistName: 'Dua Lipa',
    collectionName: 'Dua Lipa (Deluxe)',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/6e/19/d9/6e19d9ca-1321-1eea-e797-51d7ab5b56c2/mzaf_5898999508314966855.plus.aac.p.m4a',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c1/54/2d/c1542d45-c6c2-12ca-7308-6eacd762c562/190295807870.jpg/100x100bb.jpg',
  },
  {
    trackId: 6781023655,
    trackName: 'Love Of My Life',
    artistName: 'Queen',
    collectionName: 'A Night At The Opera',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/6f/c7/a3/6fc7a31c-7a1e-41a8-1548-af881c44d4ed/mzaf_13234219584251779565.plus.aac.p.m4a',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/86/92/dd86925d-484d-8ee7-3985-ef3264214269/602527644264.jpg/100x100bb.jpg',
  },
  {
    trackId: 6781080308,
    trackName: 'Killer Queen',
    artistName: 'Queen',
    collectionName: 'Greatest Hits',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/04/d6/7f/04d67f91-6110-0e65-2866-4cca26a2a686/mzaf_11464815836670487468.plus.aac.p.m4a',
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b0/ca/05/b0ca05aa-29c9-4e01-5a16-f6fa06bce05c/602527594347.jpg/100x100bb.jpg',
  },
];

const INITIAL_SUGGESTED_ALBUMS: AlbumType[] = [
  {
    artistId: 3296287,
    artistName: 'Queen',
    collectionId: 6781023399,
    collectionName: 'A Night At The Opera',
    collectionPrice: 9.99,
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/dd/86/92/dd86925d-484d-8ee7-3985-ef3264214269/602527644264.jpg/100x100bb.jpg',
    releaseDate: '1975-11-21T08:00:00Z',
    trackCount: 12,
  },
  {
    artistId: 1031397873,
    artistName: 'Dua Lipa',
    collectionId: 1538003494,
    collectionName: 'Future Nostalgia',
    collectionPrice: 9.99,
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/6c/11/d6/6c11d681-aa3a-d59e-4c2e-f77e181026ab/190295092665.jpg/100x100bb.jpg',
    releaseDate: '2020-03-27T12:00:00Z',
    trackCount: 13,
  },
  {
    artistId: 3296287,
    artistName: 'Queen',
    collectionId: 6781080300,
    collectionName: 'Greatest Hits',
    collectionPrice: 12.99,
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b0/ca/05/b0ca05aa-29c9-4e01-5a16-f6fa06bce05c/602527594347.jpg/100x100bb.jpg',
    releaseDate: '1981-10-26T08:00:00Z',
    trackCount: 17,
  },
  {
    artistId: 3296287,
    artistName: 'Queen',
    collectionId: 6781027361,
    collectionName: 'Bohemian Rhapsody (The Original Soundtrack)',
    collectionPrice: 15.99,
    artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/62/2e/97/622e97c4-d620-2ae1-2a47-a32e16a01492/602567988847.jpg/100x100bb.jpg',
    releaseDate: '2018-10-19T07:00:00Z',
    trackCount: 22,
  },
];

function Search() {
  const [artistInput, setArtistInput] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchedAlbuns, setSearchedAlbuns] = useState<AlbumType[]>([]);
  const [previousSearch, setPreviousSearch] = useState<string>('');
  const [suggestedSongs, setSuggestedSongs] = useState<SongType[]>(INITIAL_SUGGESTED_SONGS);
  const [suggestedAlbums, setSuggestedAlbums] = useState<AlbumType[]>(INITIAL_SUGGESTED_ALBUMS);

  useEffect(() => {
    const loadInitialHomeData = async () => {
      const user = await getUser();
      if (user?.name) {
        setUserName(user.name);
      }

      try {
        const songRes = await fetch(
          'https://itunes.apple.com/search?term=The+Weeknd+Coldplay+Bruno+Mars&entity=song&limit=6',
        );
        if (songRes.ok) {
          const songData = await songRes.json();
          if (Array.isArray(songData.results) && songData.results.length > 0) {
            const validSongs = songData.results.filter(
              (item: SongType) => item && item.trackId && item.previewUrl,
            );
            if (validSongs.length >= 4) {
              setSuggestedSongs(validSongs.slice(0, 6));
            }
          }
        }
      } catch {
        // Keep initial curated songs if offline or rate-limited
      }

      try {
        const albums = await searchAlbumsAPI('Coldplay');
        if (albums && albums.length >= 4) {
          setSuggestedAlbums([
            ...INITIAL_SUGGESTED_ALBUMS.slice(0, 2),
            ...albums.slice(0, 4),
          ]);
        }
      } catch {
        // Keep initial curated albums if offline
      }
    };

    loadInitialHomeData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistInput(event.target.value);
  };

  const runArtistSearch = async (term: string) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;
    setIsLoading(true);
    try {
      const albuns = await searchAlbumsAPI(cleanTerm);
      setSearchedAlbuns(albuns);
      setPreviousSearch(cleanTerm);
      setArtistInput('');
      setSearched(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await runArtistSearch(artistInput);
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
      <div className="heroSearchBanner">
        <div className="heroWelcomeText">
          <span className="welcomePill">✨ EXPLORAR CATÁLOGO</span>
          <h1>
            {userName ? `Olá, ${userName}! O que vamos ouvir hoje?` : 'O que vamos ouvir hoje?'}
          </h1>
          <p>Pesquise por seus artistas preferidos ou aproveite as recomendações abaixo</p>
        </div>

        <form className="searchMain" onSubmit={ handleSearch }>
          <div className="inputArtist">
            <input
              type="text"
              placeholder="Type the artist or band name"
              name="artist"
              value={ artistInput }
              onChange={ handleChange }
              className="pesquisador"
            />
          </div>
          <button type="submit" className="pesquisaB">
            Pesquisar
          </button>
        </form>

        <div className="quickTrendingRow">
          <span className="quickLabel">Sugestões rápidas:</span>
          {SUGGESTED_ARTISTS.map((artist) => (
            <button
              key={ artist.name }
              type="button"
              className={ `quickArtistChip ${previousSearch.toLowerCase() === artist.name.toLowerCase() && searched ? 'activeChip' : ''}` }
              onClick={ () => runArtistSearch(artist.name) }
            >
              {artist.name}
            </button>
          ))}
        </div>
      </div>

      {searched ? (
        searchedAlbuns.length > 0 ? (
          <div className="albunsDiv">
            <div className="resultsHeaderRow">
              <p className="defaultText">{`Resultado de álbuns de: ${previousSearch}`}</p>
              <button
                type="button"
                className="backHomeBtn"
                onClick={ () => setSearched(false) }
              >
                ← Voltar para o Início
              </button>
            </div>
            <div className="albumsGrid">
              {searchedAlbuns.map((album) => (
                <div key={ album.collectionId } className="cover">
                  <Link
                    to={ `/album/${album.collectionId}` }
                    className="albumName"
                  >
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                      className="imageCover"
                    />
                    <span className="albumTitleText">{album.collectionName}</span>
                  </Link>
                  <p className="artistName">{album.artistName}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="nothingFound">
            <img src={ circleX } alt="Nenhum álbum encontrado" />
            <p>Nenhum álbum foi encontrado</p>
            <button
              type="button"
              className="backHomeBtn"
              onClick={ () => setSearched(false) }
            >
              ← Voltar para o Início
            </button>
          </div>
        )
      ) : (
        <div className="homeDiscoveryContainer">
          <section className="discoverySection">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Artistas Sugeridos</h2>
                <p className="sectionSubtitle">Clique em um artista para explorar sua discografia completa</p>
              </div>
            </div>
            <div className="suggestedArtistsGrid">
              {SUGGESTED_ARTISTS.map((artist) => (
                <button
                  key={ artist.name }
                  type="button"
                  className="artistSuggestionCard"
                  onClick={ () => runArtistSearch(artist.name) }
                >
                  <div className="artistImgWrap">
                    <img src={ artist.image } alt={ artist.name } className="artistAvatar" />
                    <span className="artistBadge">{artist.tag}</span>
                  </div>
                  <div className="artistCardInfo">
                    <span className="artistCardName">{artist.name}</span>
                    <span className="artistCardGenre">{artist.genre}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="discoverySection">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Músicas Sugeridas para Você</h2>
                <p className="sectionSubtitle">Ouça uma prévia agora mesmo ou salve nas suas favoritas</p>
              </div>
            </div>
            <div className="suggestedSongsList">
              {suggestedSongs.map((song) => (
                <MusicCard key={ song.trackId } musics={ song } />
              ))}
            </div>
          </section>

          <section className="discoverySection">
            <div className="sectionHeader">
              <div>
                <h2 className="sectionTitle">Álbuns Recomendados</h2>
                <p className="sectionSubtitle">Álbuns selecionados para começar sua sessão musical</p>
              </div>
            </div>
            <div className="albumsGrid">
              {suggestedAlbums.map((album) => (
                <div key={ album.collectionId } className="cover">
                  <Link
                    to={ `/album/${album.collectionId}` }
                    className="albumName"
                  >
                    <img
                      src={ album.artworkUrl100 }
                      alt={ album.collectionName }
                      className="imageCover"
                    />
                    <span className="albumTitleText">{album.collectionName}</span>
                  </Link>
                  <p className="artistName">{album.artistName}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default Search;
