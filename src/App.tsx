import ReactGA from 'react-ga4';
import styled from 'styled-components';

import Title from './components/Title.tsx';
import MemeGenerator from './components/MemeGenerator.tsx';
import Footer from './components/Footer.tsx';

import './App.css';
import './font.css';

const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

if (import.meta.env.MODE === 'production') {
  ReactGA.initialize(gaTrackingId);
  ReactGA.send('pageview');
}

function App() {
  return (
    <Container>
      <Title />
      <MemeGenerator />
      <Footer />
    </Container>
  );
}

export default App;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
