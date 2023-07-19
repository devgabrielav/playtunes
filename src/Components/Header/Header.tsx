import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../Loading/Loading';

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
      <Loading />
    );
  }

  return (
    <header data-testid="header-component">
      <h3 data-testid="header-user-name">{ user?.name }</h3>
      <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
      <NavLink to="/favorites" data-testid="link-to-favorites">Favoritos</NavLink>
      <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
    </header>
  );
}

export default Header;
