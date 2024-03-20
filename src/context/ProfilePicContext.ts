import { createContext } from 'react';

export type ProfilePicType = {
  photo: string;
  changePic: (pic: string) => void;
  name: string;
  changeName: (name: string) => void;
};

const ProfilePicContext = createContext({} as ProfilePicType);

export default ProfilePicContext;
