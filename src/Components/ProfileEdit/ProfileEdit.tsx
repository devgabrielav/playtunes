import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Loading from '../Loading/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<UserType>({} as UserType);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (isEmail(inputValue.email)
      && inputValue.email.length > 0
      && inputValue.description.length > 0
      && inputValue.name.length > 0
      && inputValue.image.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    await updateUser(inputValue);
    navigate('/profile');
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const usuario = await getUser();
      setInputValue(usuario);
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
        type="url"
        data-testid="edit-input-image"
        onChange={ handleChange }
        name="image"
        placeholder="Coloque uma url ou caminho de imagem"
        value={ inputValue.image }
      />
      <img src={ inputValue.image } alt="" />
      <input
        type="text"
        name="name"
        data-testid="edit-input-name"
        onChange={ handleChange }
        placeholder="Digite seu usuário"
        value={ inputValue.name }
      />
      <input
        type="text"
        name="email"
        data-testid="edit-input-email"
        onChange={ handleChange }
        placeholder="Digite seu email"
        value={ inputValue.email }
      />
      <input
        type="text"
        name="description"
        data-testid="edit-input-description"
        onChange={ handleChange }
        placeholder="Digite sua descrição"
        value={ inputValue.description }
      />
      <button
        data-testid="edit-button-save"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Salvar
      </button>
    </form>
  );
}

export default ProfileEdit;
