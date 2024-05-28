import { SongType } from '../types';

const FAVORITE_SONGS_KEY = 'favorite_songs';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) as string)) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}
const readFavoriteSongs = async (): Promise<SongType[]> => await JSON.parse(
  localStorage.getItem(FAVORITE_SONGS_KEY) as string,
);

const saveFavoriteSongs = (favoriteSongs: SongType[]) => localStorage
  .setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));

export const getFavoriteSongs = async (): Promise<SongType[]> => {
  const favoriteSongs = await readFavoriteSongs();
  return favoriteSongs;
};

export const addSong = async (song: SongType): Promise<void> => {
  if (song) {
    const favoriteSongs = await readFavoriteSongs();
    saveFavoriteSongs([...favoriteSongs, song]);
  }
};

export const removeSong = async (song: SongType): Promise<void>  => {
  const favoriteSongs = await readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
};
