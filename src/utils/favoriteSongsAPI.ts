import { MusicCardType } from '../components/MusicCard';
import { SongType } from '../types/SongType';

const FAVORITE_SONGS_KEY = 'favorite_songs';
const TIMEOUT = 500;
const SUCCESS_STATUS = 'OK';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) as string)) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}
const readFavoriteSongs = (): SongType[] => JSON.parse(
  localStorage.getItem(FAVORITE_SONGS_KEY) as string,
);

const saveFavoriteSongs = (favoriteSongs: SongType[]) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

const simulateRequest = (response: any) => (callback: (param: any) => void) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

export const getFavoriteSongs = (): Promise<SongType[]> => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  simulateRequest(favoriteSongs)(resolve);
});

export const addSong = (song: SongType): Promise<'OK'> => new Promise((resolve) => {
  if (song) {
    const favoriteSongs = readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const removeSong = (song: SongType): Promise<'OK'> => new Promise((resolve) => {
  const favoriteSongs = readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
  simulateRequest(SUCCESS_STATUS)(resolve);
});

export const addRemove = async ({ song, favSongs, setFavSongs }: MusicCardType) => {
  const trackExistsInFav = favSongs.find((track) => track.trackId === song.trackId);

  if (trackExistsInFav) {
    const removedSong = favSongs.filter((item) => item !== trackExistsInFav);
    setFavSongs(removedSong);
    await removeSong(song);
  } else {
    setFavSongs([...favSongs, song]);
    await addSong(song);
  }
}