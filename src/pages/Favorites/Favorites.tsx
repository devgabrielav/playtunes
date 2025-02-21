import { useEffect, useState } from "react";
import { SongType } from "../../types/SongType";
import { getFavoriteSongs } from "../../utils/favoriteSongsAPI";
import MusicCard from "../../components/MusicCard";
import Loading from "../../components/Loading";

function Favorites() {
  const [favoriteTracks, setFavoriteTracks] = useState<SongType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchTracks = async () => {
      const favoriteSongs = await getFavoriteSongs();
      setFavoriteTracks(favoriteSongs); 
      setLoading(false);
    }
    fetchTracks();
  }, []);

  if (loading) {
    return <Loading />
  }
  
  return (
    <div>
      { favoriteTracks.length > 0 ? (
        favoriteTracks.map((track) => (
          <MusicCard setFavSongs={ setFavoriteTracks } favSongs={ favoriteTracks } song={ track } />
        ))
      ) : (
        <h1>No favorite songs added.</h1>
      ) }
    </div>
  )
}

export default Favorites;