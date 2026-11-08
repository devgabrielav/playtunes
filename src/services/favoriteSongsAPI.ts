import { SongType } from '../types';

const FAVORITE_SONGS_KEY = 'favorite_songs';
const FAVORITES_BY_USER_KEY = 'playtunes_favorites_by_user';

if (!JSON.parse(localStorage.getItem(FAVORITE_SONGS_KEY) as string)) {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
}

const getActiveUserKey = (): string | null => {
  try {
    const rawUser = localStorage.getItem('user');
    if (!rawUser) return null;
    const parsed = JSON.parse(rawUser);
    return parsed?.name ? parsed.name.trim().toLowerCase() : null;
  } catch {
    return null;
  }
};

const readFavoritesByUserDB = (): Record<string, SongType[]> => {
  try {
    const raw = localStorage.getItem(FAVORITES_BY_USER_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeFavoritesByUserDB = (db: Record<string, SongType[]>) => {
  localStorage.setItem(FAVORITES_BY_USER_KEY, JSON.stringify(db));
};

const readFavoriteSongs = async (): Promise<SongType[]> => {
  const userKey = getActiveUserKey();
  if (userKey) {
    const db = readFavoritesByUserDB();
    if (Array.isArray(db[userKey])) {
      localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify(db[userKey]));
      return db[userKey];
    }
    // If no user-specific entry exists yet:
    const hasAnyUserEntries = Object.keys(db).length > 0;
    if (!hasAnyUserEntries) {
      // Migrate existing global favorites to the first user
      const rawGlobal = localStorage.getItem(FAVORITE_SONGS_KEY);
      const globalSongs = rawGlobal ? JSON.parse(rawGlobal) : [];
      const validGlobal = Array.isArray(globalSongs) ? globalSongs : [];
      db[userKey] = validGlobal;
      writeFavoritesByUserDB(db);
      return validGlobal;
    }
    db[userKey] = [];
    writeFavoritesByUserDB(db);
    localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify([]));
    return [];
  }

  const raw = localStorage.getItem(FAVORITE_SONGS_KEY);
  const songs = raw ? JSON.parse(raw) : [];
  return Array.isArray(songs) ? songs : [];
};

const saveFavoriteSongs = (favoriteSongs: SongType[]) => {
  localStorage.setItem(FAVORITE_SONGS_KEY, JSON.stringify(favoriteSongs));
  const userKey = getActiveUserKey();
  if (userKey) {
    const db = readFavoritesByUserDB();
    db[userKey] = favoriteSongs;
    writeFavoritesByUserDB(db);
  }
};

export const getFavoriteSongs = async (): Promise<SongType[]> => {
  const favoriteSongs = await readFavoriteSongs();
  return favoriteSongs;
};

export const addSong = async (song: SongType): Promise<void> => {
  if (song) {
    const favoriteSongs = await readFavoriteSongs();
    const exists = favoriteSongs.some((s) => s.trackId === song.trackId);
    if (!exists) {
      saveFavoriteSongs([...favoriteSongs, song]);
    }
  }
};

export const removeSong = async (song: SongType): Promise<void> => {
  const favoriteSongs = await readFavoriteSongs();
  saveFavoriteSongs(favoriteSongs.filter((s) => s.trackId !== song.trackId));
};
