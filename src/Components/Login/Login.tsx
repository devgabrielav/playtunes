import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../Loading/Loading';
import './Login.css';
import logo from './logo.png';

function Login() {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    if (inputValue.length <= 2) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    await createUser({ name: inputValue });
    navigate('/search');
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loginLoader">
        <Loading />
      </div>
    );
  }

  return (
    <main className="loginMain">
      <div className="box">
        <img src={ logo } alt="" className="logo" />
        <input
          type="text"
          placeholder="Digite seu login"
          data-testid="login-name-input"
          onChange={ handleChange }
          name="login"
          className="login"
        />
        <br />
        <button
          data-testid="login-submit-button"
          disabled={ isChecked }
          onClick={ handleClick }
          className="button"
          style={ isChecked ? { color: 'grey' } : { color: 'white' } }
        >
          Entrar
        </button>
      </div>
    </main>
  );
}

export default Login;
