import styled from 'styled-components';
import { LanguageType } from '../types/LanguageType';
import { useAtom } from 'jotai';
import { langTypeAtom } from '../atoms/languageAtom';
import { STRINGS } from '../constants/language';

const LanguageSelect = () => {
  const [, setCurrentLangType] = useAtom(langTypeAtom);

  const langList: { type: LanguageType; label: string }[] = [
    { type: 'ko', label: STRINGS['LANGUAGE_TYPE']['ko'] },
    { type: 'en', label: STRINGS['LANGUAGE_TYPE']['en'] },
  ];

  return (
    <Select
      onChange={(e) => {
        setCurrentLangType(e.target.value as LanguageType);
      }}
    >
      <HiddenOption selected disabled>
        Language
      </HiddenOption>
      {langList.map((item) => (
        <Option key={item.type} value={item.type}>
          {item.label}
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelect;

export const Select = styled.select`
  width: fit-content;
  cursor: pointer;
  background: none;
  border: 1px solid lightgray;
  font-size: 1rem;
  font-family: 'DungGeunMo';
  text-align: center;
  border-radius: 6px;
  padding: 4px 6px;
  color: gray;

  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  height: 1rem;
`;

const HiddenOption = styled.option`
  display: none;
`;
