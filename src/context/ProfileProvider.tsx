import { useState } from 'react';
import ProfilePicContext from './ProfilePicContext';
import defaultUser from '../images/default-user.png';

type ProfileProviderProps = {
  children: React.ReactNode;
};

function ProfileProvider({ children }: ProfileProviderProps) {
  const [profilePic, setProfilePic] = useState<string>(defaultUser);
  const [username, setUsername] = useState<string>('');

  function changePhoto(photo: string) {
    setProfilePic(photo);
  }

  function changeUsername(user: string) {
    setUsername(user);
  }

  return (
    <ProfilePicContext.Provider
      value={
      {
        photo: profilePic,
        changePic: changePhoto,
        name: username,
        changeName: changeUsername,
      }
      }
    >
      { children }
    </ProfilePicContext.Provider>
  );
}

export default ProfileProvider;
