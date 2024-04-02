import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';
import ProfilePicContext from '../../context/ProfilePicContext';

function Header() {
  const profileContext = useContext(ProfilePicContext);

  return (
    <header data-testid="header-component" className="navegacao">
      <NavLink to="/search">
        <img src={ logo } alt="" className="logoNavH" />
      </NavLink>
      <br />
      <div className="navsCont">
        <NavLink
          to="/search"
          data-testid="link-to-search"
          className="navs"
        >
          Pesquisa
        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          className="navs"
        >
          Favoritas
        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          className="navs"
        >
          Perfil
        </NavLink>
        <div className="imgAndName">
          <img
            src={ profileContext.photo }
            alt="Profile Pic"
            className="imageUser"
          />
          <span
            data-testid="header-user-name"
            className="userSpan"
          >
            { profileContext.name }
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
