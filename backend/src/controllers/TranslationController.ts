import { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TranslationService } from "../services/TranslationService";
import TYPES from "../types";
import { RegistrableController } from "./RegistrableController";

interface TranslationPayload {
  inputLanguage: string | null;
  outputLanguage: string;
  text: string;
}

interface DetectLanguagePayload {
  text: string;
}

@injectable()
export class TranslationController implements RegistrableController {
  @inject(TYPES.TranslationService)
  private translationService!: TranslationService;

  public register(app: Application): void {
    app.route("/translateText").post(this.translateText);
    app.route("/detectLanguage").post(this.detectLanguage);
  }

  private translateText = async (req: Request, res: Response) => {
    const { inputLanguage, outputLanguage, text } =
      req.body as TranslationPayload;
    try {
      const translatedText = await this.translationService.translateText(
        inputLanguage,
        outputLanguage,
        text
      );
      res.status(200).json({ data: translatedText });
    } catch (e: any) {
      const errorMsg = `Failed to translate from ${inputLanguage} to ${outputLanguage}. ${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };

  private detectLanguage = async (req: Request, res: Response) => {
    const { text } = req.body as DetectLanguagePayload;
    try {
      const detectedLanguage = await this.translationService.detectLanguage(
        text
      );
      res.status(200).json({ data: detectedLanguage });
    } catch (e: any) {
      const errorMsg = `Failed to detect the language of the text ${text}. ${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };
}
