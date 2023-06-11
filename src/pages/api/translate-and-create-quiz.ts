import type { NextApiRequest, NextApiResponse } from "next";
import { translateAndCreateQuiz } from "./util/apiCalls";
import Question from "./util/types/question";

interface TranslateAndCreateQuizNextApiRequest extends NextApiRequest {
  body: {
    inputLanguage: string;
    outputLanguage: string;
    text: string;
    mock?: boolean;
  };
}

export interface TranslateAndCreateQuizResponse {
  quiz: Question[];
}

export default async function handler(
  req: TranslateAndCreateQuizNextApiRequest,
  res: NextApiResponse<TranslateAndCreateQuizResponse>
) {
  const quiz: Question[] = await translateAndCreateQuiz(
    req.body.inputLanguage,
    req.body.outputLanguage,
    req.body.text,
    req.body.mock
  );
  res.status(200).json({ quiz: quiz });
}
