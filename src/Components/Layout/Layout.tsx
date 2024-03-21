import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.css';
import ProfilePicContext from '../../context/ProfilePicContext';
import { readUser } from '../../services/userAPI';

function Layout() {
  const profileContext = useContext(ProfilePicContext);

  useEffect(() => {
    const userExists = readUser();
    if (userExists) {
      profileContext.changeName(userExists.name);
      if (userExists.image) {
        profileContext.changePic(userExists.image);
      }
    }
  }, [profileContext]);

  return (
    <div className="layoutDiv">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
