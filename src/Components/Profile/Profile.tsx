import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './Profile.css';
import defaultUser from '/assets/default-user.png';

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
      <div className="dadosUser">
        <Loading />
      </div>
    );
  }

  return (
    <div className="dadosUser">
      <div className="backProfile">
        <img
          src={ userData && userData.image ? userData.image : defaultUser }
          alt="Foto usuário"
          className="profilePic"
        />
      </div>
      <div className="divData">
        <h3 className="h3Profile">Nome</h3>
        <p className="pProfile">{ userData?.name }</p>
        <h3 className="h3Profile">Email</h3>
        <p className="pProfile">{ userData?.email }</p>
        <h3 className="h3Profile">Descrição</h3>
        <p className="pProfile descrip">{ userData?.description }</p>
        <Link to="/profile/edit" className="editButton">Editar perfil</Link>
      </div>
    </div>
  );
}

export default Profile;
