import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './provider/SearchProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <SearchProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </SearchProvider>
);