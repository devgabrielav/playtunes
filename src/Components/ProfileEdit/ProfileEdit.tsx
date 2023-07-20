import { useEffect, useState } from 'react';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';

function ProfileEdit() {
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
    <form action="">
      <input
        type="image"
        src={ userData?.image }
        alt=""
        data-testid="edit-input-image"
      />
      <input
        type="text"
        name="nome"
        id=""
        value={ userData?.name }
        data-testid="edit-input-name"
      />
      <input
        type="email"
        name="email"
        id=""
        value={ userData?.email }
        data-testid="edit-input-email"
      />
      <input
        type="text"
        name="descrição"
        value={ userData?.description }
        data-testid="edit-input-description"
      />
      <button data-testid="edit-button-save">Salvar</button>
    </form>
  );
}

export default ProfileEdit;
