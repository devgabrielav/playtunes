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
import ProfileProvider from './context/ProfileProvider';
import { readUser } from './services/userAPI';
import { UserType } from './types';

function App() {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userExists = readUser();
    if (userExists) {
      setUser(userExists);
    }
  }, []);

  return (
    <ProfileProvider>
      <Routes>
        <Route Component={ Layout }>
          <Route path="/search" Component={ Search } />
          <Route path="/album/:id" Component={ Album } />
          <Route path="/favorites" Component={ Favorites } />
          <Route path="/profile" Component={ Profile } />
          <Route path="/profile/edit" Component={ ProfileEdit } />
        </Route>
        {user
          ? (
            <Route Component={ Layout }>
              <Route path="/" Component={ Search } />
            </Route>)
          : <Route path="/" Component={ Login } />}
        <Route path="*" Component={ NotFound } />
      </Routes>
    </ProfileProvider>
  );
}

export default App;
