import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';
import { UserType } from '../../types';
import { getUser } from '../../services/userAPI';
import defaultProfilePicture from '../../images/default-user.png';

function Header() {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  const [user, setUser] = useState<UserType>({ ...emptyUser, name: 'Guest' });

  useState(() => {
    const fetchUser = async () => {
      const userFetched = await getUser();
      if (userFetched.image.length === 0) {
        setUser({ ...userFetched, image: defaultProfilePicture });
      } else {
        setUser(userFetched);
      }
    }
    fetchUser();
  });

  return (
    <header className="navegacao">
      <NavLink to="/search">
        <img src={ logo } alt="" className="logoNavH" />
      </NavLink>
      <br />
      <div className="navsCont">
        <NavLink
          to="/search"
          className="navs"
        >
          Pesquisa
        </NavLink>
        <NavLink
          to="/favorites"
          className="navs"
        >
          Favoritas
        </NavLink>
        <NavLink
          to="/profile"
          className="navs"
        >
          Perfil
        </NavLink>
        <div className="imgAndName">
          <img
            src={ user.image }
            alt="Profile Pic"
            className="imageUser"
          />
          <span
            className="userSpan"
          >
            { user.name }
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
