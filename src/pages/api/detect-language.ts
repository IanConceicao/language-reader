import type { NextApiRequest, NextApiResponse } from "next";
import { detectLanguage } from "../util/apiCalls";

interface DetectLanguageNextApiRequest extends NextApiRequest {
  body: {
    text: string;
  };
}

export interface DetectLanguageResponse {
  language: string;
}

export default async function handler(
  req: DetectLanguageNextApiRequest,
  res: NextApiResponse<DetectLanguageResponse>
) {
  const language = await detectLanguage(req.body.text);
  res.status(200).json({ language: language });
}
