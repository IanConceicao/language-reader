import type { NextApiRequest, NextApiResponse } from "next";
import { detectLanguage, translate } from "./util/apiCalls";

interface TranslationNextApiRequest extends NextApiRequest {
  body: {
    inputLanguage: string;
    outputLanguage: string;
    text: string;
  };
}

export interface TranslationLanguageResponse {
  translation: string;
}

export default async function handler(
  req: TranslationNextApiRequest,
  res: NextApiResponse<TranslationLanguageResponse>
) {
  const translation = await translate(
    req.body.inputLanguage,
    req.body.outputLanguage,
    req.body.text
  );
  res.status(200).json({ translation: translation });
}
