import styled from 'styled-components';
import { Title } from '../../components/Title';
import LanguageSelect from '../../components/LanguageSelect';
import { GeneratorContainer } from '../../views/Generator/GeneratorContainer';
import Footer from '../../components/Footer';

export const HomePage = () => {
  return (
    <Container>
      <Title />
      <LanguageSelectWrapper>
        <LanguageSelect />
      </LanguageSelectWrapper>
      <GeneratorContainer />
      <Footer />
    </Container>
  );
};

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
