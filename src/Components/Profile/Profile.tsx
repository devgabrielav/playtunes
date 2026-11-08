import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { getUser, logoutUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './Profile.css';
import defaultUser from '/assets/default-user.png';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserType>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const usuario = await getUser();
      setUserData(usuario);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

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
        <div className="profileBannerInner">
          <img
            src={ userData && userData.image ? userData.image : defaultUser }
            alt="Foto usuário"
            className="profilePic"
            onError={ (e) => {
              (e.currentTarget as HTMLImageElement).src = defaultUser;
            } }
          />
          <div className="profileActionsGroup">
            <Link to="/profile/edit" className="editButton">Editar perfil</Link>
            <button
              type="button"
              onClick={ handleLogout }
              className="leaveProfileButton"
            >
              Sair do perfil
            </button>
          </div>
        </div>
      </div>
      <div className="divData">
        <div className="profileField">
          <h3 className="h3Profile">Nome</h3>
          <p className="pProfile">{ userData?.name || '—' }</p>
        </div>
        <div className="profileField">
          <h3 className="h3Profile">Email</h3>
          <p className="pProfile">{ userData?.email || '—' }</p>
        </div>
        <div className="profileField">
          <h3 className="h3Profile">Descrição</h3>
          <p className="pProfile descrip">{ userData?.description || '—' }</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
