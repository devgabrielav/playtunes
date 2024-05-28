import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Loading from '../Loading/Loading';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './ProfileEdit.css';
import defaultProfilePic from '../../images/default-user.png';

function ProfileEdit() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState<UserType>({} as UserType);
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setInputValue(fetchedUser);
    };
    fetchUser();
  }, []);

  const validateUser = (user: UserType) => {
    if (isEmail(user.email)
      && user.email.length > 0
      && user.description.length > 0
      && user.name.length > 0
      && user.image.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
    validateUser(inputValue);
  };

  const handleClick = async () => {
    setIsLoading(true);
    navigate('/profile');
    setIsLoading(false);
    if (inputValue.image.length === 0) {
      updateUser({ ...inputValue, image: defaultProfilePic });
    }
    updateUser(inputValue);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchUser = async () => {
      const usuario = await getUser();
      setInputValue(usuario);
      validateUser(usuario);
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <div className="formEdit">
        <Loading />
      </div>
    );
  }

  return (
    <form action="" className="formEdit">
      <div className="backEdit">
        <img src={ inputValue.image } alt="" className="imgProfile" />
        <input
          type="url"
          data-testid="edit-input-image"
          onChange={ handleChange }
          name="image"
          placeholder="Insira um link"
          value={ inputValue.image }
          className="userImage"
        />
      </div>
      <div className="otherInputs">
        <h3 className="editH3">Nome </h3>
        <p className="editP">Fique à vontade para usar seu nome social</p>
        <input
          type="text"
          name="name"
          data-testid="edit-input-name"
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
          data-testid="edit-input-email"
          onChange={ handleChange }
          placeholder="Digite seu email"
          value={ inputValue.email }
          className="inputEmail"
        />
        <h3 className="editH3">Descrição</h3>
        <textarea
          name="description"
          data-testid="edit-input-description"
          onChange={ (event) => handleChange(event) }
          placeholder="Sobre mim"
          value={ inputValue.description }
          className="description"
        />
        <button
          data-testid="edit-button-save"
          disabled={ isDisabled }
          onClick={ handleClick }
          className="saveButton"
          style={ isDisabled ? { color: 'grey' } : { color: 'white' } }
        >
          Salvar
        </button>
      </div>
    </form>
  );
}

export default ProfileEdit;
