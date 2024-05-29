import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MusicCard from '../MusicCard/MusicCard';
import getMusics from '../../services/musicsAPI';
import Loading from '../Loading/Loading';
import { AlbumType, SongType } from '../../types';
import './Album.css';

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
  });

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      if (id) {  
        const data = await getMusics(id); // musics = [AlbumType, ...SongType[]]
        const [album, ...musics] = data;
        setAlbumAndArtist(album);
        setMusicsToBe(musics);
        setShowInfo(true);
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="albumDetails">
        <Loading />
      </div>
    );
  }
  return (
    <div className="mainDiv">
      {showInfo && (
        <div style={ { background: '#dfe3e7' } }>
          <div className="albumDetails">
            <img
              src={ albumAndArtist.artworkUrl100 }
              alt={ albumAndArtist.collectionName }
              className="capa"
            />
            <div className="artistAndAlbum">
              <p
                data-testid="album-name"
                className="albumNameA"
              >
                { albumAndArtist.collectionName }
              </p>
              <p
                data-testid="artist-name"
                className="artistNameA"
              >
                { albumAndArtist.artistName }
              </p>
            </div>
          </div>
          <div className="albumSongs">
            {musicsToBe.map((music) => (
              <MusicCard
                musics={ music }
                key={ music.trackId }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Album;
