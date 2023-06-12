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
const firebaseConfig = {
  apiKey: "AIzaSyB9nJiNeyno6xt5Z3MoJ2iXKq5g2gco290",
  authDomain: "language-reader-379923.firebaseapp.com",
  projectId: "language-reader-379923",
  storageBucket: "language-reader-379923.appspot.com",
  messagingSenderId: "974780501043",
  appId: "1:974780501043:web:16d3622657e26491f3e746",
  measurementId: "G-YLS5FNYMF4",
};

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
