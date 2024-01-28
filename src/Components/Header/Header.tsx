import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../Loading/Loading';
import logo from './logo.png';
import './Header.css';

function Header() {
  const [user, setUser] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      const usuario = await getUser();
      setUser(usuario);
      setIsLoading(false);
    };
    fetch();
  }, []);

  if (isLoading) {
    return (
      <div className="headerLoading">
        <Loading />
      </div>
    );
  }

  return (
    <header data-testid="header-component" className="navegacao">
      <img src={ logo } alt="" className="logoNavH" />
      <br />
      <div className="navsCont">
        <NavLink
          to="/search"
          data-testid="link-to-search"
          className="navs"
        >
          🔍 Pesquisa
        </NavLink>
        <NavLink
          to="/favorites"
          data-testid="link-to-favorites"
          className="navs"
        >
          ⭐ Favoritas
        </NavLink>
        <NavLink
          to="/profile"
          data-testid="link-to-profile"
          className="navs"
        >
          👤 Perfil
        </NavLink>
      </div>
      <div className="imgAndName">
        <img src={ user?.image } alt="" className="imageUser" />
        <span data-testid="header-user-name" className="userSpan">{ user?.name }</span>
      </div>
    </header>
  );
}

export default Header;
