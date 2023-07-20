import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Login.css';
import trybe from './trybe.png';
import headphone from './Ellipse 1 (Stroke).png';
import tunes from './tunes.png';

function Login() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleClick = async () => {
    setIsLoading(true);
    await createUser({ name: inputValue });
    navigate('/search');
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="box">
      <div className="logo">
        <img src={ trybe } alt="" />
        <img src={ headphone } alt="" />
        <img src={ tunes } alt="" />
      </div>
      <input
        type="text"
        placeholder="Digite seu nome"
        data-testid="login-name-input"
        onChange={ handleChange }
        name="login"
      />
      <button
        data-testid="login-submit-button"
        disabled={ inputValue.length < 3 }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
