import { useEffect, useState } from "react";
import { getUser } from "../utils/userAPI";
import { UserType } from "../types/UserType";
import Loading from "./Loading/Loading";
import defaultProfile from '../assets/default-user.png';

function Header() {
  const [loading, setLoading] = useState<boolean>(false);
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

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <nav>
        <a href="/search">Search</a>
        <a href="/favorites">Favorites</a>
        <a href="/profile">Profile</a>
      </nav>
      <div>
        <a href="/profile"><img src={ userData.image ? userData.image : defaultProfile } /></a>
        <p>{ userData.name }</p>
      </div>
    </>
  )
}

export default Header;