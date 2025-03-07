import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import Album from "./pages/Album/Album";
import Favorites from "./pages/Favorites/Favorites";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit";
import NotFound from "./pages/NotFound/NotFound";
import Layout from "./pages/Layout/Layout";
import { useEffect } from "react";
import { getUser } from "./utils/userAPI";

function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const userExists = async () => {
      const user = await getUser();
      if (pathname !== '/' && !user.name) {
        navigate('/');
      } else {
        navigate('/search');
      }
    }
    userExists();
  }, [])

  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
        <Route path='*' element={ <NotFound /> }/>
      </Route>
    </Routes>
  );
}

export default App;