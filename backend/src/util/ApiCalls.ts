const { Translate } = require("@google-cloud/translate").v2;
import { codes } from "../data/countries_to_ISO_639";

export const translateText = async (
  inputLanguage: string,
  outputLanguage: string,
  inputText: string
): Promise<string> => {
  const CREDENTIALS = JSON.parse(
    process.env.GOOGLE_TRANSLATE_CREDENTIALS || "{}"
  );

  // TODO: Make a way so you aren't constantly making new translates every call
  const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id,
  });

  const inputCode = getIsoForLanguage(inputLanguage);
  const outputCode = getIsoForLanguage(outputLanguage);

  const [translation] = await translate.translate(inputText, outputCode); //TODO: update to advanced translation
  // https://cloud.google.com/translate/docs/advanced/translate-text-advance
  return translation;
};

const getIsoForLanguage = (language: string): string => {
  if (!(language in codes)) {
    throw new Error(`Cannot find ISO-639-1 code for language: ${language}`);
  } else {
    return codes[language];
  }
};
