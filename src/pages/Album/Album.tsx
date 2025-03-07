import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SongType } from "../../types/SongType";
import getMusics from "../../utils/musicsAPI";
import { AlbumType, initialValue } from "../../types/AlbumType";
import { getFavoriteSongs } from "../../utils/favoriteSongsAPI";
import MusicCard from "../../components/MusicCard";
import Loading from "../../components/Loading/Loading";

function Album() {
  const { id } = useParams();
  const [musics, setMusics] = useState<SongType[]>([]);
  const [albumInfo, setAlbumInfo] = useState<AlbumType>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [favSongs, setFavSongs] = useState<SongType[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchMusics = async () => {
      if (id) {
        const result = await getMusics(id);
        const songs = result.splice(1, result.length);
        const favoriteSongs = await getFavoriteSongs();
        setFavSongs(favoriteSongs); 
        setAlbumInfo(result[0]);
        setMusics(songs as SongType[]);
      }
      setLoading(false);
    }
    fetchMusics();
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div>
          <h1>{ albumInfo.collectionName }</h1>
          <p>{ albumInfo.artistName }</p>
          <img src={ albumInfo.artworkUrl100 } alt={ `Cover for ${albumInfo.collectionName}` } />
      </div>
      { musics.map((song) => (
        <MusicCard setFavSongs={ setFavSongs } song={ song } favSongs={ favSongs }/>
      )) }
    </>
  )
}

export default Album;