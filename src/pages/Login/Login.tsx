import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../utils/userAPI";
import Loading from "../../components/Loading";

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
    <form onSubmit={ (e) => e.preventDefault() }>
      <input type="text" onChange={ (event) => setName(event.target.value) }/>
      <button disabled={ name.length >= 3 ? false : true } onClick={ login }>
        Login
      </button>
    </form>
  )
}

export default Login;