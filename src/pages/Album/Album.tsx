import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongType } from "../../types/SongType";
import getMusics from "../../utils/musicsAPI";
import { AlbumType, initialValue } from "../../types/AlbumType";
import { LoadingContext } from "../../context/LoadingContext";
import checkedHeart from '../../assets/checked_heart.png';
import emptyHeart from '../../assets/empty_heart.png';

function Album() {
  const { id } = useParams();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [albumInfo, setAlbumInfo] = useState<AlbumType>(initialValue);
  const { setLoading } = useContext(LoadingContext);
  const [favSongs, setFavSongs] = useState<SongType[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchMusics = async () => {
      if (id) {
        const result = await getMusics(id);
        const songs = result.splice(1, result.length);
        setAlbumInfo(result[0]);
        setMusics(songs as SongType[]);
      }
      setLoading(false);
    }
    fetchMusics();
  }, []);

  const addRemove = (song: SongType) => {
    const trackExistsInFav = favSongs.find((track) => track.trackId === song.trackId);

    if (trackExistsInFav) {
      const removedSong = favSongs.filter((item) => item !== trackExistsInFav);
      setFavSongs(removedSong);
    } else {
      setFavSongs([...favSongs, song]);
    }
  }

  return (
    <>
      <div>
          <h1>{ albumInfo.collectionName }</h1>
          <p>{ albumInfo.artistName }</p>
          <img src={ albumInfo.artworkUrl100 } alt={ `Cover for ${albumInfo.collectionName}` } />
      </div>
      { musics.map((song) => (
        <div key={ song.trackId }>
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
          <input type="checkbox" name="FavSong" id={`favSong${song.trackId}`} onChange={ () => addRemove(song) } hidden />
          </div>
        </div>
      )) }
    </>
  )
}

export default Album;