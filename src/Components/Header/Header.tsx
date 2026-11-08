import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '/assets/logo.png';
import './Header.css';
import { UserType } from '../../types';
import { getUser, logoutUser } from '../../services/userAPI';
import defaultProfilePicture from '/assets/default-user.png';

function Header() {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  const [user, setUser] = useState<UserType>({
    ...emptyUser,
    name: 'Guest',
    image: defaultProfilePicture,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userFetched = await getUser();
      if (!userFetched) return;
      if (!userFetched.image || userFetched.image.trim().length === 0) {
        setUser({ ...userFetched, image: defaultProfilePicture });
      } else {
        setUser(userFetched);
      }
    };
    fetchUser();
    window.addEventListener('userUpdated', fetchUser);
    return () => window.removeEventListener('userUpdated', fetchUser);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="navegacao">
      <div className="headerTop">
        <NavLink to="/" className="logoLink">
          <img src={ logo } alt="Playtunes Logo" className="logoNavH" />
        </NavLink>
        <div className="imgAndName mobileUser">
          <img
            src={ user.image || defaultProfilePicture }
            alt="Profile Pic"
            className="imageUser"
            onError={ (e) => {
              (e.currentTarget as HTMLImageElement).src = defaultProfilePicture;
            } }
          />
          <span className="userSpan">
            { user.name }
          </span>
          <button
            type="button"
            className="logoutBtnMobile"
            onClick={ handleLogout }
            title="Sair do perfil"
          >
            Sair
          </button>
        </div>
      </div>
      <div className="navsCont">
        <NavLink
          to="/"
          end
          className={ ({ isActive }) => `navs ${isActive ? 'activeNav' : ''}` }
        >
          Pesquisa
        </NavLink>
        <NavLink
          to="/favorites"
          className={ ({ isActive }) => `navs ${isActive ? 'activeNav' : ''}` }
        >
          Favoritas
        </NavLink>
        <NavLink
          to="/profile"
          className={ ({ isActive }) => `navs ${isActive ? 'activeNav' : ''}` }
        >
          Perfil
        </NavLink>
        <div className="desktopUserFooter">
          <div className="imgAndName desktopUser">
            <img
              src={ user.image || defaultProfilePicture }
              alt="Profile Pic"
              className="imageUser"
              onError={ (e) => {
                (e.currentTarget as HTMLImageElement).src = defaultProfilePicture;
              } }
            />
            <span className="userSpan">
              { user.name }
            </span>
          </div>
          <button
            type="button"
            className="logoutBtnSidebar"
            onClick={ handleLogout }
          >
            Sair / Trocar perfil
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
