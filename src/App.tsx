import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';

function App() {
  return (
    <div>
      <p>Trybetunes</p>
      <Routes>
        <Route path="/" Component={ Login } />
      </Routes>
    </div>
  );
}

export default App;
