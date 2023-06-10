import exampleQuiz from "@/pages/util/data/exampleQuiz";
import { DETECT_LANGUAGE } from "./data/supportedLanguages";
import Question from "./types/Question";
import { getIsoForLanguage, getLanguageFromIso } from "./isoConvert";
const { TranslationServiceClient } = require("@google-cloud/translate").v3;

const translationCredentials = JSON.parse(
  process.env.GOOGLE_TRANSLATE_CREDENTIALS || "{}"
);

const translationClient = new TranslationServiceClient({
  credentials: translationCredentials,
  projectId: translationCredentials.project_id,
});

export const translate = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string
): Promise<string> => {
  console.log("Input language is", inputLanguage);
  const inputLanguageCode =
    inputLanguage === DETECT_LANGUAGE ? null : getIsoForLanguage(inputLanguage);
  const outputLanguageCode = getIsoForLanguage(outputLanguage);

  try {
    const request = {
      parent: `projects/${translationCredentials.project_id}/locations/global`,
      contents: [text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: inputLanguageCode,
      targetLanguageCode: outputLanguageCode,
    };

    const [response] = await translationClient.translateText(request);
    return response.translations[0].translatedText;
  } catch (e: any) {
    throw Error(`Googled Translate failed to translate: ${e.message}`);
  }
};

export const detectLanguage = async (text: string): Promise<string> => {
  const MAX_TEXT_LENGTH = 60; // Arbitrary limit, because not that many characters are needed for language detection,
  text = text.substring(0, MAX_TEXT_LENGTH);

  const request = {
    parent: `projects/${translationCredentials.project_id}/locations/global`,
    content: text,
    mimeType: "text/plain", // mime types: text/plain, text/html
  };
  let languageCode;
  try {
    const [response] = await translationClient.detectLanguage(request);
    languageCode = response.languages[0].languageCode;
  } catch (e: any) {
    throw Error(
      `Googled Translate failed to detect the language: ${e.message}`
    );
  }
  return getLanguageFromIso(languageCode);
};

export const translateAndCreateQuiz = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string,
  mock?: boolean
): Promise<Question[]> => {
  const body_to_send = {
    inputLanguage: inputLanguage === DETECT_LANGUAGE ? null : inputLanguage,
    outputLanguage: outputLanguage,
    text: text,
    mock: mock ? mock : null,
  };
  await new Promise((r) => setTimeout(r, 8000)); // Mimic API call delay
  // Ommited code
  return exampleQuiz;
};
