import _ from 'lodash';
import { useLanguage } from './LanguageContext';

type Replacements = { [key: string]: string | number | undefined };
export type Dictionary = (key: string, replacements?: Replacements | undefined) => string;

export const useDictionary = (): Dictionary => {
  const { dictionary } = useLanguage();

  return (key, replacements) => {
    let value = _.get(dictionary, key, key);
    if (!replacements || !Object.keys(replacements).length) {
      return value;
    }
    for (const [k, replacement] of Object.entries(replacements)) {
      value = value.replaceAll(`%${k}%`, String(replacement));
    }
    return value;
  };
};
