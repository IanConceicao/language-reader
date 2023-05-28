import { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../types";
import { RegistrableController } from "./RegistrableController";
import { QuizService } from "../services/QuizService";

interface CreateQuizPayload {
  language: string;
  text: string;
}

interface translateAndCreateQuiz {
  inputLanguage: string | null;
  outputLanguage: string;
  text: string;
  mock: boolean | null; // Used for prototyping, just returns an example quiz
}

@injectable()
export class QuizController implements RegistrableController {
  private static MAX_NUMBER_OF_WORDS = 1200;

  @inject(TYPES.QuizService)
  private quizService!: QuizService;

  public register(app: Application): void {
    app.route("/createQuiz").post(this.createQuiz);
    app.route("/translateAndCreateQuiz").post(this.translateAndCreateQuiz);
  }

  private isTooManyWords = (text: string): boolean =>
    text.split(" ").filter((word) => word !== "").length >
    QuizController.MAX_NUMBER_OF_WORDS;

  private createQuiz = async (req: Request, res: Response) => {
    const { language, text } = req.body as CreateQuizPayload;
    if (this.isTooManyWords(text)) {
      return res
        .status(400)
        .send(
          `Text must be less than ${QuizController.MAX_NUMBER_OF_WORDS} words.`
        );
    }
    try {
      const quiz = await this.quizService.createQuiz(language, text);
      return res.status(200).json({ data: quiz });
    } catch (e: any) {
      const errorMsg = `Failed to make a quiz in ${language}:\n${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };

  private translateAndCreateQuiz = async (req: Request, res: Response) => {
    const { inputLanguage, outputLanguage, text, mock } =
      req.body as translateAndCreateQuiz;
    if (this.isTooManyWords(text)) {
      return res
        .status(400)
        .send(
          `Text must be less than ${QuizController.MAX_NUMBER_OF_WORDS} words.`
        );
    }
    try {
      const quiz = await this.quizService.translateAndCreateQuiz(
        inputLanguage,
        outputLanguage,
        text,
        mock
      );
      return res.status(200).json({ data: quiz });
    } catch (e: any) {
      const errorMsg = `Failed to translate from ${inputLanguage} and make a quiz in ${outputLanguage}:\n${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };
}
