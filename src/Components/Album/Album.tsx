import MusicCard from "../MusicCard/MusicCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getMusics from "../../services/musicsAPI";
import Loading from "../Loading/Loading";
import { AlbumType, SongType } from "../../types";

function Album() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [musicsToBe, setMusicsToBe] = useState<SongType[]>([]);
  const [albumAndArtist, setAlbumAndArtist] = useState<AlbumType>({
    artistId: 0,
    artistName: '',
    collectionId: 0,
    collectionName: '',
    collectionPrice: 0,
    artworkUrl100: '',
    releaseDate: '',
    trackCount: 0,
  })

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      if(id) {
        const musics = await getMusics(id);
        setAlbumAndArtist(musics[0]);
        musics.shift();
        setMusicsToBe(musics as SongType[])
        setShowInfo(true);
        setIsLoading(false);
      }
    }
    fetch();
  },[])

  if (isLoading) {
    return (
      <Loading />
    );
  }
  return (
    <div>
      {showInfo && (
        <div>
          <img src={albumAndArtist.artworkUrl100} alt={albumAndArtist.collectionName} />
          <h2 data-testid="artist-name">{albumAndArtist.artistName}</h2>
          <h1 data-testid="album-name">{albumAndArtist.collectionName}</h1>
          {musicsToBe.map((music) => (
          <MusicCard trackId={music.trackId} trackName={music.trackName} previewUrl={music.previewUrl} key={ music.trackId }/>
          ))}
        </div>
      )}
    </div>
)}

export default Album;