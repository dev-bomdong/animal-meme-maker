import styled from 'styled-components';
import { useI18n } from '../hooks/useI18n';
import { useAtom } from 'jotai/index';
import { LanguageType } from '../types/LanguageType';
import { langTypeAtom } from '../atoms/languageAtom';

export const Title = () => {
  const [currentLangType] = useAtom<LanguageType>(langTypeAtom);
  const { getTransString } = useI18n(currentLangType);

  return <StyledTitle>{getTransString('TITLE')}</StyledTitle>;
};

const StyledTitle = styled.div`
  font-size: 2.5rem;
  font-family: 'DungGeunMo';
`;
