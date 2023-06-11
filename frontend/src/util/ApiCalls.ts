import { DETECT_LANGUAGE } from "../data/SupportedLanguages";
import Question from "./types/Question";

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
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_to_send),
    });
    if (response.ok) {
      const body = await response.json();
      return body.data;
    } else {
      console.error((await response.json()).message);
    }
  } catch (e: any) {
    console.error(e.message);
  }
  return "";
};

// TODO: Important! Need to handle the case and prompt the user when the server is sleeping and they need to wait a bit
export const detectLanguage = async (text: string): Promise<string> => {
  const url = BACKEND_URL + "/detectLanguage/";
  const body_to_send = {
    text: text,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_to_send),
    });
    if (response.ok) {
      const body = await response.json();
      return body.data;
    } else {
      console.error((await response.json()).message);
    }
  } catch (e: any) {
    console.error(e.message);
  }
  return "";
};

export const pingBackend = async (): Promise<Response> => {
  // Ping the backend to wake it in case it is sleeping
  const response = await fetch(BACKEND_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
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
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body_to_send),
    });
    if (response.ok) {
      const body = await response.json();
      return body.data;
    } else {
      console.error((await response.json()).message);
    }
  } catch (e: any) {
    console.error(e.message);
  }
  return [];
};
