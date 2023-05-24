import { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import TYPES from "../types";
import { RegistrableController } from "./RegistrableController";
import { QuizService } from "../services/QuizService";

interface QuizPayload {
  language: string;
  text: string;
}

@injectable()
export class QuizController implements RegistrableController {
  @inject(TYPES.QuizService)
  private quizService!: QuizService;

  public register(app: Application): void {
    app.route("/createQuiz").post(this.createQuiz);
  }

  private createQuiz = async (req: Request, res: Response) => {
    const { language, text } = req.body as QuizPayload;
    try {
      const quiz = await this.quizService.createQuiz(language, text);
      res.status(200).json({ data: quiz });
    } catch (e: any) {
      const errorMsg = `Failed to make a quiz in ${language} of the text ${text}. ${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };
}
