import styled from 'styled-components';
import ReactGA from 'react-ga';

import Title from './components/Title.tsx';
import MemeGenerator from './components/MemeGenerator.tsx';
import Footer from './components/Footer.tsx';

import './App.css';
import './font.css';

const gaTrackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(gaTrackingId);

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
