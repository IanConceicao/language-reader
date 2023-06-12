/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import exampleQuiz from "./exampleQuiz";
import { Configuration, OpenAIApi } from "openai";
import { dedent } from "ts-dedent";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest({ cors: true }, (request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export const createQuiz = onRequest(
  { cors: true, timeoutSeconds: 100 },
  async (request, response) => {
    const language: string = request.body.data.language;
    const text: string = request.body.data.text;
    const mock: boolean = request.body.data.mock ? true : false;

    if (mock) {
      await new Promise((r) => setTimeout(r, 5000)); // Mimic API call delay
      response.send({ data: { quiz: exampleQuiz } });
    } else {
      const prompt = dedent`
        Read the article below and create a multiple choice quiz in JSON format with 4 questions and 4 answer choices per question. Make each question only have 1 right answer, and randomize the order of the correct answers. The article is in ${language}, so also write the quiz in ${language}. Return the quiz in JSON as a list of Questions, where a Question is defined as:

        interface Question {
        prompt: string;
        answers: string[];
        correctAnswer: number;  // The index of the correct answer
        answerExplanation: string;
        }

        The article:

        ${text}
        `;
      try {
        const theResponse = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
        });
        if (theResponse.data.choices[0].message) {
          const message = theResponse.data.choices[0].message.content as string;
          const onlyArrayPortion = message.substring(
            message.indexOf("["),
            message.lastIndexOf("]") + 1
          );
          response.send({ data: { quiz: JSON.parse(onlyArrayPortion) } });
        } else {
          throw Error("No messages return by ChatGPT");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        throw Error(
          `ChatGPT failed to generate the quiz in language ${language}\n: ${e.message}.`
        );
      }
    }
  }
);
