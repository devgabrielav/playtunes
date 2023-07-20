import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const usuario = await getUser();
      setUserData(usuario);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <img src={ userData?.image } alt="Foto usuário" data-testid="profile-image" />
      <Link to="/profile/edit">Editar perfil</Link>
      <h3>Nome</h3>
      <p>{ userData?.name }</p>
      <h3>Email</h3>
      <p>{ userData?.email }</p>
      <h3>Descrição</h3>
      <p>{ userData?.description }</p>
    </div>
  );
}

export default Profile;
