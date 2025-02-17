import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import Loading from "./Loading";
import { getUser } from "../utils/userAPI";
import { UserType } from "../types/UserType";

function Header() {
  const { setLoading } = useContext(LoadingContext);
  const [userData, setUserData] = useState<UserType>({ name: '', email: '', image: '', description: '' });

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const user = await getUser();
      setUserData(user);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return (
    <>
      <nav>
        <a href="/search">Search</a>
        <a href="/favorites">Favorites</a>
        <a href="/profile">Profile</a>
      </nav>
      <p>{ userData.name }</p>
    </>
  )
}

export default Header;