import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import LoadingProvider from './provider/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
  <LoadingProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </LoadingProvider>
);