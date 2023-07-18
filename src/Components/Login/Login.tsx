import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';

type ChangeProp = {
  login: string,
};

function Login() {
  const [inputValue, setInputValue] = useState<ChangeProp>({
    login: '',
  });
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });

    if (inputValue.login.length >= 2) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    await createUser({ name: inputValue.login });
    navigate('/search');
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Digite seu nome"
        data-testid="login-name-input"
        onChange={ handleChange }
        name="login"
      />
      <button
        data-testid="login-submit-button"
        disabled={ isActive }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
