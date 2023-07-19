import { useState } from 'react';
import { SongType } from '../../types';
import empty from '../../images/empty_heart.png';
import checked from '../../images/checked_heart.png';
import './MusicCard.css';

function MusicCard(musics: SongType) {
  const { trackName, previewUrl, trackId } = musics;
  const [isChecked, setIsChecked] = useState(false);

  const heartFull = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

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
      </label>
      <input
        type="checkbox"
        name={ trackName }
        id={ trackName }
        checked={ isChecked }
        onChange={ heartFull }
        hidden
      />
    </div>
  );
}

export default MusicCard;
