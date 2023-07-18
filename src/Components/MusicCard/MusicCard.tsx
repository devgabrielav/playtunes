import { SongType } from "../../types";

function MusicCard(musics: SongType) {
  return (
    <div>
      <span>{musics.trackName}</span>
      <audio data-testid="audio-component" src={musics.previewUrl} controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento{" "} <code>audio</code>.
      </audio>
    </div>
  )
}

export default MusicCard;