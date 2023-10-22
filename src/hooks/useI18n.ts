import { LanguageType } from '../types/LanguageType';
import { STRINGS } from '../constants/language';

/*
 * language type에 맞는 string return
 * */
export const useI18n = (langType: LanguageType) => {
  const getTransString = (key: keyof typeof STRINGS) => {
    return STRINGS[key][langType];
  };

  return { getTransString: getTransString };
};
