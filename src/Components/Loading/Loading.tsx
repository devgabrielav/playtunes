import { RingLoader } from 'react-spinners';
import './Loading.css';

function Loading() {
  return (
    <div className="loader">
      <RingLoader color="#00D5E2" className="spinner" />
      <h1 className="loadingH1">Carregando...</h1>
    </div>
  );
}

export default Loading;
