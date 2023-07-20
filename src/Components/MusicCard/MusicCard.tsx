import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from '../Loading/Loading';
import empty from '../../images/empty_heart.png';
import checked from '../../images/checked_heart.png';
import './MusicCard.css';

type MusicCardType = {
  musics : SongType,
  handleClick: (event : React.MouseEvent<HTMLInputElement>) => void | null,
};

function MusicCard({ musics, handleClick }: MusicCardType) {
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

  /*   useEffect(() => {
    const fetch = async () => {
      if (isChecked === true) {
        await addSong(musics);
      } else {
        await removeSong(musics);
      }
    };
    fetch();
  }, [heartFull, musics]); */

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <span>{ trackName }</span>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        { trackName }
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
      </audio>
      <label
        htmlFor={ trackName }
        data-testid={ `checkbox-music-${trackId}` }
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
        />
      </label>
    </div>
  );
}

export default MusicCard;
