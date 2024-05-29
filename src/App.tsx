import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';
import Album from './Components/Album/Album';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Favorites from './Components/Favorites/Favorites';
import Profile from './Components/Profile/Profile';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';
import { readUser } from './services/userAPI';
import { UserType } from './types';

function App() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const findUser = async () => {
      const userExists = await readUser();
      if (userExists) {
        setUser(userExists);
      }
    };
    findUser();
  }, []);

  return (
    <Routes>
      <Route path="/" Component={ user ? Layout : Login }>
        <Route index Component={ Search } />
        <Route path="/album/:id" Component={ Album } />
        <Route path="/favorites" Component={ Favorites } />
        <Route path="/profile" Component={ Profile } />
        <Route path="/profile/edit" Component={ ProfileEdit } />
      </Route>
      <Route path="*" Component={ NotFound } />
    </Routes>
  );
}

export default App;
