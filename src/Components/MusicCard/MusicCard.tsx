import { SongType } from '../../types';

function MusicCard(musics: SongType) {
  const { trackName, previewUrl } = musics;
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
    </div>
  );
}

export default MusicCard;
