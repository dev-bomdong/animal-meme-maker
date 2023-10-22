import ReactGA from 'react-ga4';
import styled from 'styled-components';

import MemeGenerator from './components/MemeGenerator.tsx';
import Footer from './components/Footer.tsx';

import './App.css';
import './font.css';

import { Title } from './components/Title.tsx';
import LanguageSelect from './components/LanguageSelect.tsx';

const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

if (import.meta.env.MODE === 'production') {
  ReactGA.initialize(gaTrackingId);
  ReactGA.send('pageview');
}

function App() {
  return (
    <Container>
      <Title />
      <LanguageSelectWrapper>
        <LanguageSelect />
      </LanguageSelectWrapper>
      <MemeGenerator />
      <Footer />
    </Container>
  );
}

export default App;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LanguageSelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
