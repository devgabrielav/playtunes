import { useEffect, useState } from "react";
import { UserType } from "../../types/UserType";
import { getUser } from "../../utils/userAPI";
import defaultProfileImage from '../../assets/default-user.png';
import Loading from "../../components/Loading/Loading";

export const initialValue: UserType = {
  name: '',
  email: '',
  image: '',
  description: ''
}

function Profile() {
  const [user, setUser] = useState<UserType>(initialValue);
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <img src={ user.image.length > 0 ? user.image : defaultProfileImage } alt="Profile picture" />
      <p>{ user.name }</p>
      <p>{ user.description }</p>
      <p>{ user.email }</p>
    </div>
  )
}

export default Profile;