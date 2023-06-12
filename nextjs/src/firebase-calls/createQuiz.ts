// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import Question from "@/api-utils/types/question";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIRE_BASE_CONFIG || "{}"
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

if (process.env.NODE_ENV !== "production") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

export interface createQuizParams {
  language: string;
  text: string;
  mock?: boolean;
}

const createQuizFirebase = httpsCallable<
  createQuizParams,
  { quiz: Question[] }
>(functions, "createQuiz");

export const createQuiz = async (
  quizParams: createQuizParams
): Promise<Question[]> => {
  try {
    const result = await createQuizFirebase(quizParams);
    return result.data.quiz;
  } catch (e: any) {
    console.error(`Firebase error trying to make the quiz:\n${e.message}`);
    return [];
  }
};
