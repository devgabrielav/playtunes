import { useEffect, useState } from 'react';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';
import empty from '../../images/empty_heart.png';
import checked from '../../images/checked_heart.png';
import './MusicCard.css';

function MusicCard(musics: SongType) {
  const { trackName, previewUrl, trackId } = musics;
  const [isChecked, setIsChecked] = useState(false);

  const heartFull = () => {
    if (isChecked === true) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (isChecked === true) {
        await addSong(musics);
      } else {
        await removeSong(musics);
      }
    };
    fetch();
  }, [isChecked, musics]);

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
        />
      </label>
    </div>
  );
}

export default MusicCard;
