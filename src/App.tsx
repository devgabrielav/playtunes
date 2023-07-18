import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';
import Album from './Components/Album/Album';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/search" Component={ Search } />
        <Route path='/album/:id' Component={ Album } />
        <Route path='*' Component={ NotFound } />
      </Routes>
    </div>
  );
}

export default App;
