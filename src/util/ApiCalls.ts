import exampleQuiz from "@/data/exampleQuiz";
import { DETECT_LANGUAGE } from "../data/supportedLanguages";
import Question from "./types/Question";
// TODO: Make this file basically what the backend was
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://language-reader.herokuapp.com"
    : "http://localhost:8000";

export const translate = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string
): Promise<string> => {
  const url = BACKEND_URL + "/translateText/";
  const body_to_send = {
    inputLanguage: inputLanguage === DETECT_LANGUAGE ? null : inputLanguage,
    outputLanguage: outputLanguage,
    text: text,
  };
  // Omitted code
  return "Temporary translation";
};

// TODO: Important! Need to handle the case and prompt the user when the server is sleeping and they need to wait a bit
export const detectLanguage = async (text: string): Promise<string> => {
  const url = BACKEND_URL + "/detectLanguage/";
  const body_to_send = {
    text: text,
  };
  // Omitted code
  return "English";
};

export const translateAndCreateQuiz = async (
  inputLanguage: string,
  outputLanguage: string,
  text: string,
  mock?: boolean
): Promise<Question[]> => {
  const url = BACKEND_URL + "/translateAndCreateQuiz/";
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
