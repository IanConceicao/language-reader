import { codes } from "./data/countries_to_ISO_639";

export const getIsoForLanguage = (language: string): string => {
  if (!(language in codes)) {
    throw new Error(`Cannot find ISO-639-1 code for language: ${language}`);
  } else {
    return codes[language];
  }
};

export const getLanguageFromIso = (ISOCode: string): string => {
  for (const language in codes) {
    if (codes[language] === ISOCode) {
      return language;
    }
  }
  throw new Error(`Cannot find language for ISO-639-1 code: ${ISOCode}`);
};
