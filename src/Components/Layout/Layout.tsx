import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.css';

function Layout() {
  return (
    <div className="layoutDiv">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
