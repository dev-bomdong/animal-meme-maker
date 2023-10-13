import './App.css';
import './font.css';
import MainPage from './pages/mainPage.tsx';
import ReactGA from 'react-ga';

const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(gaTrackingId);

function App() {
  return <MainPage />;
}

export default App;
