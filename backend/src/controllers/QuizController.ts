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
  @inject(TYPES.QuizService)
  private quizService!: QuizService;

  public register(app: Application): void {
    app.route("/createQuiz").post(this.createQuiz);
    app.route("/translateAndCreateQuiz").post(this.translateAndCreateQuiz);
  }

  private createQuiz = async (req: Request, res: Response) => {
    const { language, text } = req.body as CreateQuizPayload;
    try {
      const quiz = await this.quizService.createQuiz(language, text);
      res.status(200).json({ data: quiz });
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
    try {
      const quiz = await this.quizService.translateAndCreateQuiz(
        inputLanguage,
        outputLanguage,
        text,
        mock
      );
      res.status(200).json({ data: quiz });
    } catch (e: any) {
      const errorMsg = `Failed to translate from ${inputLanguage} and make a quiz in ${outputLanguage}:\n${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };
}
