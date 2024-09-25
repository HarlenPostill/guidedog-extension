import _ from 'lodash';

import dictionary from '../dictionary.json';

type Replacements = { [key: string]: string | number | undefined };

export type Dictionary = (key: string, replacements?: Replacements | undefined) => string;

export const useDictionary = (): Dictionary => (key, replacements) => {
  let value = _.get(dictionary, key, key);
  if (!replacements || !Object.keys(replacements).length) {
    return value;
  }

  for (const [key, replacement] of Object.entries(replacements)) {
    value = value.replaceAll(`%${key}%`, String(replacement));
  }

  return value;
};
