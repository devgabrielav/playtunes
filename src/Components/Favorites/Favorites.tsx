import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../Loading/Loading';
import MusicCard from '../MusicCard/MusicCard';
import './Favorites.css';

function Favorites() {
  const [favoriteMusics, setFavoriteMusics] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      const musics = await getFavoriteSongs();
      setFavoriteMusics(musics);
      setIsLoading(false);
    };
    fetchFavorites();
  }, []);

  const fetchSongs = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const mapped = favoriteMusics.filter((music) => music.trackName !== target.name);
    setFavoriteMusics(mapped);
  };

  if (isLoading) {
    return (
      <div className="favMusics">
        <Loading />
      </div>
    );
  }

  return (
    <div className="favMusics">
      <div className="title">
        <p className="favText">Músicas Favoritas</p>
      </div>
      <div className="musicsFav">
        {favoriteMusics.length > 0 ? (
          favoriteMusics.map((music) => (
            <MusicCard
              handleClick={ fetchSongs }
              musics={ music }
              key={ music.trackId || music.trackName }
            />
          ))
        ) : (
          <div className="emptyFavCard">
            <p>Você ainda não adicionou nenhuma música às favoritas.</p>
            <Link to="/" className="exploreFavBtn">
              Explorar músicas na Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
