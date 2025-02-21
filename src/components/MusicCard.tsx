import { SongType } from "../types/SongType";
import checkedHeart from '../assets/checked_heart.png';
import emptyHeart from '../assets/empty_heart.png';
import { addRemove } from "../utils/favoriteSongsAPI";

export type MusicCardType = {
  song: SongType;
  favSongs: SongType[];
  setFavSongs: React.Dispatch<React.SetStateAction<SongType[]>>;
}

function MusicCard({ song, favSongs, setFavSongs }: MusicCardType) {
  return (
    <div key={ song.trackId }>
          <p>{ song.trackName }</p>
          <audio
            src={ song.previewUrl }
            controls
            className="audio"
          >
            { song.trackName }
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
          </audio>
          <div>
          <label htmlFor={`favSong${song.trackId}`}>
            <img
              src={ favSongs.find((track) => track.trackId === song.trackId) ? checkedHeart : emptyHeart } 
              alt="Fav song"
            />
          </label>
          <input type="checkbox" name="FavSong" id={`favSong${song.trackId}`} onChange={ () => addRemove({song, favSongs, setFavSongs}) } hidden />
          </div>
        </div>
  )
}

export default MusicCard;