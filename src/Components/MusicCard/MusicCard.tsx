import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
import empty from '/assets/empty_heart.png';
import checked from '/assets/checked_heart.png';
import './MusicCard.css';

type MusicCardType = {
  musics : SongType,
  handleClick?: (event : React.MouseEvent<HTMLInputElement>) => void,
};

function MusicCard({ musics, handleClick = undefined }: MusicCardType) {
  const { trackName, previewUrl, trackId } = musics;
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const heartFull = async () => {
    if (isChecked === true) {
      setIsChecked(false);
      await removeSong(musics);
    } else {
      setIsChecked(true);
      await addSong(musics);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchMusic = async () => {
      const result = await getFavoriteSongs();
      result.filter((music) => {
        if (music.trackId === trackId) {
          return setIsChecked(true);
        }
        return null;
      });
      setIsLoading(false);
    };
    fetchMusic();
  }, [trackId]);

  if (isLoading) {
    return (
      <div className="card">
        <Loading />
      </div>
    );
  }

  return (
    <div className="card">
      <span className="songName">{ trackName }</span>
      <div className="audioAndCheck">
        <div className="audioBack">
          <audio
            src={ previewUrl }
            controls
            className="audio"
          >
            { trackName }
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
        </div>
        <label
          htmlFor={ trackName }
          className="heart"
        >
          <img
            src={ isChecked ? (checked) : (empty) }
            alt="favorite"
          />
          <input
            type="checkbox"
            name={ trackName }
            id={ trackName }
            checked={ isChecked }
            onChange={ heartFull }
            onClick={ handleClick }
            style={ { appearance: 'none' } }
          />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
