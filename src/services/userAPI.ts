import { UserType } from '../types';

const USER_KEY = 'user';
const USERS_DB_KEY = 'playtunes_users_db';

const normalizeKey = (name: string) => name.trim().toLowerCase();

const readUsersDB = (): Record<string, UserType> => {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const writeUsersDB = (db: Record<string, UserType>) => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
};

export const getSavedUsersList = (): UserType[] => {
  const db = readUsersDB();
  return Object.values(db);
};

export const readUser = async (): Promise<UserType> => {
  const rawUser = localStorage.getItem(USER_KEY);
  const user: UserType | null = rawUser ? JSON.parse(rawUser) : null;
  if (user && user.name) {
    const db = readUsersDB();
    const key = normalizeKey(user.name);
    if (!db[key]) {
      db[key] = user;
      writeUsersDB(db);
    }
  }
  return user as UserType;
};

const saveUser = (user: UserType, previousName?: string) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  if (user && user.name) {
    const db = readUsersDB();
    if (previousName && normalizeKey(previousName) !== normalizeKey(user.name)) {
      const prevKey = normalizeKey(previousName);
      const nextKey = normalizeKey(user.name);
      delete db[prevKey];
      try {
        const favRaw = localStorage.getItem('playtunes_favorites_by_user');
        if (favRaw) {
          const favDb = JSON.parse(favRaw);
          if (favDb[prevKey] && !favDb[nextKey]) {
            favDb[nextKey] = favDb[prevKey];
            delete favDb[prevKey];
            localStorage.setItem('playtunes_favorites_by_user', JSON.stringify(favDb));
          }
        }
      } catch {
        // ignore storage errors
      }
    }
    db[normalizeKey(user.name)] = user;
    writeUsersDB(db);
  }
  window.dispatchEvent(new Event('userUpdated'));
};

export const getUser = async (): Promise<UserType> => {
  const user = await readUser();
  return user;
};

export const createUser = (user: UserType | { name: string }): void => {
  const emptyUser: UserType = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  const trimmedName = user.name.trim();
  const db = readUsersDB();
  const existingUser = db[normalizeKey(trimmedName)];

  if (existingUser) {
    // Restore saved info for this existing user
    saveUser({
      ...emptyUser,
      ...existingUser,
      ...('email' in user && user.email ? { email: user.email } : {}),
      ...('image' in user && user.image ? { image: user.image } : {}),
      ...('description' in user && user.description ? { description: user.description } : {}),
    });
  } else {
    // Create a brand new user profile
    saveUser({
      ...emptyUser,
      ...user,
      name: trimmedName,
    });
  }
};

export const updateUser = (updatedUser: UserType): void => {
  const rawCurrent = localStorage.getItem(USER_KEY);
  const currentUser: UserType | null = rawCurrent ? JSON.parse(rawCurrent) : null;
  saveUser({ ...updatedUser }, currentUser?.name);
};

export const logoutUser = (): void => {
  const rawCurrent = localStorage.getItem(USER_KEY);
  const currentUser: UserType | null = rawCurrent ? JSON.parse(rawCurrent) : null;
  if (currentUser && currentUser.name) {
    const db = readUsersDB();
    db[normalizeKey(currentUser.name)] = currentUser;
    writeUsersDB(db);
  }
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('userUpdated'));
};
