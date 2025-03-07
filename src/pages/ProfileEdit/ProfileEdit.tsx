import { useEffect, useState } from "react";
import { UserType } from "../../types/UserType";
import { initialValue } from "../Profile/Profile";
import { getUser } from "../../utils/userAPI";
import defaultProfileImage from '../../assets/default-user.png';
import InputLabel from "../../components/InputLabel";
import Loading from "../../components/Loading/Loading";

function ProfileEdit() {
  const [user, setUser] = useState<UserType>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  
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
      <InputLabel
        type="url"
        labelName="Image"
        value={ user.image.length > 0 ? user.image : '' }
        changeFunction={(event) => setUser({ ...user, image: event.target.value })  }
        placeholder="Paste your image link"
      />
      <InputLabel
        labelName="Name"
        value={ user.name }
        changeFunction={(event) => setUser({ ...user, name: event.target.value }) }
        type="text"
        placeholder="Type your name"
      />
      <InputLabel
        labelName="Email"
        value={ user.email }
        changeFunction={(event) => setUser({ ...user, email: event.target.value }) }
        type="email"
        placeholder="Type your email address"
      />
      <InputLabel
        labelName="Description"
        value={ user.description }
        changeFunction={(event) => setUser({ ...user, description: event.target.value }) }
        type="text"
        placeholder="Type something about yourself"
      />
    </div>
  )
}

export default ProfileEdit;