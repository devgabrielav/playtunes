import { Link, useParams } from 'react-router-dom';
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
    const fetchAlbum = async () => {
      if (id) {
        try {
          const data = await getMusics(id);
          if (data && data.length > 0) {
            const [album, ...musics] = data;
            setAlbumAndArtist(album);
            setMusicsToBe(musics.filter((music) => music && music.trackId));
            setShowInfo(true);
          }
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchAlbum();
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
        <div className="albumPageContent">
          <div className="albumDetails">
            <div className="albumHeaderInner">
              <img
                src={ albumAndArtist.artworkUrl100 }
                alt={ albumAndArtist.collectionName }
                className="capa"
              />
              <div className="artistAndAlbum">
                <span className="albumBadge">ÁLBUM OFICIAL</span>
                <p className="albumNameA">
                  { albumAndArtist.collectionName }
                </p>
                <p className="artistNameA">
                  { albumAndArtist.artistName }
                </p>
                <Link to="/" className="albumBackLink">
                  ← Voltar para Pesquisa
                </Link>
              </div>
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
