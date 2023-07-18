import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Search from './Components/Search/Search';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" Component={ Login } />
        <Route path="/search" Component={ Search } />
      </Routes>
    </div>
  );
}

export default App;
