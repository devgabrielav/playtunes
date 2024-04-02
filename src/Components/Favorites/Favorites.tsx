import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../Loading/Loading';
import MusicCard from '../MusicCard/MusicCard';
import './Favorites.css';

function Favorites() {
  const [favoriteMusics, setFavoriteMusics] = useState<SongType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const musics = await getFavoriteSongs();
      setIsLoading(true);
      setFavoriteMusics(musics);
      setIsLoading(false);
    };
    fetch();
  }, []);

  const fetchSongs = (event : React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const mapped = favoriteMusics.filter((music) => music.trackName !== target.name);
    setFavoriteMusics(mapped);
  };

  if (isLoading) {
    return (
      <div className="favLoading">
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
        {favoriteMusics.map((music) => (
          <MusicCard
            handleClick={ fetchSongs }
            musics={ music }
            key={ music.trackName }
          />
        ))}

      </div>
    </div>
  );
}

export default Favorites;
