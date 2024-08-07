import ReactGA from 'react-ga4';
import { HomePage } from './pages/Home/HomePage.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import './App.css';
import './font.css';

const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

if (import.meta.env.MODE === 'production') {
  ReactGA.initialize(gaTrackingId);
  ReactGA.send('pageview');
}

function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <HomePage />
    </ErrorBoundary>
  );
}

export default App;
