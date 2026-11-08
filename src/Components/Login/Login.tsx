import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, getSavedUsersList } from '../../services/userAPI';
import { UserType } from '../../types';
import './Login.css';
import logo from '/assets/logo.png';
import loginBg from '/assets/login.png';
import defaultAvatar from '/assets/default-user.png';

function Login() {
  const [username, setUsername] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [savedUsers, setSavedUsers] = useState<UserType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSavedUsers(getSavedUsersList());
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
    setIsDisabled(value.trim().length <= 2);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim().length <= 2) return;
    createUser({ name: username.trim() });
    navigate('/');
  };

  const handleSelectSavedUser = (user: UserType) => {
    createUser({ name: user.name });
    navigate('/');
  };

  return (
    <main
      className="loginMain"
      style={ {
        backgroundImage: `radial-gradient(circle at 20% 25%, rgba(37, 99, 235, 0.38) 0%, transparent 45%),
          radial-gradient(circle at 80% 75%, rgba(6, 182, 212, 0.28) 0%, transparent 45%),
          linear-gradient(135deg, rgba(5, 9, 20, 0.88) 0%, rgba(10, 20, 45, 0.92) 100%),
          url(${loginBg})`,
      } }
    >
      <div className="loginContainer">
        <div className="loginHero">
          <div className="heroBadge">
            <span className="pulseDot" />
            <span>MUSIC STREAMING PLATFORM</span>
          </div>
          <h1 className="heroTitle">
            Descubra sua próxima
            {' '}
            <span className="heroHighlight">trilha sonora</span>
            .
          </h1>
          <p className="heroSubtitle">
            Explore milhares de álbuns, escute prévias de músicas instantaneamente
            e organize suas faixas favoritas em um só lugar.
          </p>
          <div className="heroFeatures">
            <div className="featureChip">🎧 Prévias em alta definição</div>
            <div className="featureChip">⚡ Recomendações na Home</div>
            <div className="featureChip">💙 Perfis & Favoritas Salvos</div>
          </div>
        </div>

        <form className="box" onSubmit={ handleSubmit }>
          <div className="logoWrapper">
            <img src={ logo } alt="Logo playtunes" className="logo" />
          </div>
          <div className="loginHeaderText">
            <h2>Comece a ouvir agora</h2>
            <p>Entre com seu usuário salvo ou crie um novo perfil</p>
          </div>

          {savedUsers.length > 0 && (
            <div className="savedProfilesSection">
              <span className="savedProfilesLabel">Perfis salvos (clique para entrar):</span>
              <div className="savedProfilesList">
                {savedUsers.map((saved) => (
                  <button
                    key={ saved.name.toLowerCase() }
                    type="button"
                    className="savedProfileChip"
                    onClick={ () => handleSelectSavedUser(saved) }
                  >
                    <img
                      src={ saved.image && saved.image.trim() ? saved.image : defaultAvatar }
                      alt={ saved.name }
                      className="savedProfileAvatar"
                      onError={ (e) => {
                        (e.currentTarget as HTMLImageElement).src = defaultAvatar;
                      } }
                    />
                    <span className="savedProfileName">{saved.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="inputGroup">
            <input
              type="text"
              placeholder="Digite um usuário (existente ou novo)"
              value={ username }
              onChange={ handleChange }
              name="login"
              className="login"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={ isDisabled }
            className="button"
            style={ isDisabled ? { color: 'rgba(255, 255, 255, 0.45)' } : { color: 'white' } }
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
