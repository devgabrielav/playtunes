import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../utils/userAPI";
import Loading from "../../components/Loading/Loading";
import './styles.css';

function Login() {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState<boolean>(false);

  const login = async () => {
    setLoading(true);
    await createUser({ name });
    navigate('/search');
    setLoading(false);
  }

  if (loading) {
    return <Loading/>
  }

  return (
    <div id="loginDiv">
      <h2 id="loginTitle">Playtunes</h2>
      <form onSubmit={ (e) => e.preventDefault() } id="loginForm">
        <input id="loginInput" type="text" onChange={ (event) => setName(event.target.value) }/>
        <button id="loginButton" disabled={ name.length >= 3 ? false : true } onClick={ login }>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login;