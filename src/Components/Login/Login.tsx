import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import './Login.css';
import logo from '/assets/logo.png';

function Login() {
  const inputValue = useRef('');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    inputValue.current = value;
    if (inputValue.current.length <= 2) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const handleSubmit = () => {
    createUser({ name: inputValue.current });
    navigate('/');
  };

  return (
    <main className="loginMain">
      <form className="box" onSubmit={ handleSubmit }>
        <img src={ logo } alt="Logo playtunes" className="logo" />
        <input
          type="text"
          placeholder="Type a username"
          onChange={ handleChange }
          name="login"
          className="login"
        />
        <br />
        <button
          disabled={ isDisabled }
          className="button"
          style={ isDisabled ? { color: 'grey' } : { color: 'white' } }
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
