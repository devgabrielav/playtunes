import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';
import Album from './Components/Album/Album';
import NotFound from './Components/NotFound/NotFound';
import Layout from './Components/Layout/Layout';
import Favorites from './Components/Favorites/Favorites';
import Profile from './Components/Profile/Profile';
import ProfileEdit from './Components/ProfileEdit/ProfileEdit';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route Component={ Layout }>
          <Route path="/search" Component={ Search } />
          <Route path="/album/:id" Component={ Album } />
          <Route path="/favorites" Component={ Favorites } />
          <Route path="/profile" Component={ Profile } />
          <Route path="/profile/edit" Component={ ProfileEdit } />
        </Route>
        <Route path="/" Component={ Login } />
        <Route path="*" Component={ NotFound } />
      </Routes>
    </div>
  );
}

export default App;
