import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Loading from '../Loading/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './ProfileEdit.css';
import defaultProfilePic from '/assets/default-user.png';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<UserType>({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const validateUser = (user: UserType) => {
    if (
      user
      && isEmail(user.email || '')
      && user.email.trim().length > 0
      && user.description.trim().length > 0
      && user.name.trim().length > 0
      && user.image.trim().length > 0
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const usuario = await getUser();
      if (usuario) {
        setInputValue(usuario);
        validateUser(usuario);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;
    const nextUser = {
      ...inputValue,
      [name]: value,
    };
    setInputValue(nextUser);
    validateUser(nextUser);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const finalUser = {
      ...inputValue,
      image: inputValue.image.trim().length === 0 ? defaultProfilePic : inputValue.image,
    };
    updateUser(finalUser);
    setIsLoading(false);
    navigate('/profile');
  };

  if (isLoading) {
    return (
      <div className="formEdit">
        <Loading />
      </div>
    );
  }

  return (
    <form onSubmit={ handleSubmit } className="formEdit">
      <div className="backEdit">
        <div className="editAvatarRow">
          <img
            src={ inputValue.image || defaultProfilePic }
            alt="Preview do perfil"
            className="imgProfile"
            onError={ (e) => {
              (e.currentTarget as HTMLImageElement).src = defaultProfilePic;
            } }
          />
          <input
            type="url"
            onChange={ handleChange }
            name="image"
            placeholder="Insira um link"
            value={ inputValue.image }
            className="userImage"
          />
        </div>
      </div>
      <div className="otherInputs">
        <h3 className="editH3">Nome </h3>
        <p className="editP">Fique à vontade para usar seu nome social</p>
        <input
          type="text"
          name="name"
          onChange={ handleChange }
          placeholder="Digite seu usuário"
          value={ inputValue.name }
          className="inputNome"
        />
        <h3 className="editH3">E-mail</h3>
        <p className="editP">Escolha um e-mail que consulte diariamente</p>
        <input
          type="text"
          name="email"
          onChange={ handleChange }
          placeholder="Digite seu email"
          value={ inputValue.email }
          className="inputEmail"
        />
        <h3 className="editH3">Descrição</h3>
        <textarea
          name="description"
          onChange={ (event) => handleChange(event) }
          placeholder="Sobre mim"
          value={ inputValue.description }
          className="description"
        />
        <button
          type="submit"
          disabled={ isDisabled }
          className="saveButton"
          style={ isDisabled ? { color: 'rgba(255, 255, 255, 0.5)' } : { color: 'white' } }
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

export default ProfileEdit;
