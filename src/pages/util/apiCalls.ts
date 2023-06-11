import exampleQuiz from "@/pages/util/data/exampleQuiz";
import { DETECT_LANGUAGE } from "./data/supportedLanguages";
import Question from "./types/Question";
import { getIsoForLanguage, getLanguageFromIso } from "./isoConvert";
import dedent from "ts-dedent";
const { TranslationServiceClient } = require("@google-cloud/translate").v3;
const { Configuration, OpenAIApi } = require("openai");

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

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export const translateAndCreateQuiz = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string,
  mock?: boolean
): Promise<Question[]> => {
  if (mock) {
    await new Promise((r) => setTimeout(r, 5000)); // Mimic API call delay
    return exampleQuiz;
  } else {
    const translatedText = await translate(inputLanguage, outputLanguage, text);

    const languageHelper = inputLanguage
      ? `The article is in ${inputLanguage}, so also write the quiz in ${inputLanguage}.`
      : "";

    const prompt = dedent`
      Read the article below and create a multiple choice quiz in JSON format with 4 questions and 4 answer choices per question. Make each question only have 1 right answer, and randomize the order of the correct answers. ${languageHelper} Return the quiz in JSON as a list of Questions, where a Question is defined as:

      interface Question {
      prompt: string;
      answers: string[];
      correctAnswer: number;  // The index of the correct answer
      answerExplanation: string;
      }
      
      The article:

      ${translatedText}
      `;
    try {
      const theResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      const message = theResponse.data.choices[0].message.content as string;
      const onlyArrayPortion = message.substring(
        message.indexOf("["),
        message.lastIndexOf("]") + 1
      );
      return JSON.parse(onlyArrayPortion);
    } catch (e: any) {
      const errorMsg = e.response
        ? JSON.stringify(e.response.data.error.message)
        : e.message;
      throw Error(
        `ChatGPT failed to generate the quiz in language ${inputLanguage} ${errorMsg}. Response status: ${e.response.status}`
      );
    }
  }
};
