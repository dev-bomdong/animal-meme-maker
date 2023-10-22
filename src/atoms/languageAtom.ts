import { atomWithStorage } from 'jotai/utils';
import { LanguageType } from '../types/LanguageType';

export const langTypeAtom = atomWithStorage<LanguageType>('language', 'ko');
