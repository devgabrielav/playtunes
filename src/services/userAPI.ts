import { UserType } from '../types';

const USER_KEY = 'user';

export const readUser = async (): Promise<UserType> => {
  const user = await JSON.parse(localStorage.getItem(USER_KEY) as string);
  return user;
};

const saveUser = (user: UserType) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const getUser = async (): Promise<UserType> => {
  const user = await readUser();
  return user;
};

export const createUser = (user: UserType | { name: string }): void => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };

  if (user.name) {
    saveUser({ ...emptyUser, name: user.name });
  }
  saveUser({ ...emptyUser, ...user });
};

export const updateUser = (updatedUser: UserType): void => saveUser({ ...updatedUser });
