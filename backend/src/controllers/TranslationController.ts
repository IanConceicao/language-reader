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

@injectable()
export class TranslationController implements RegistrableController {
  @inject(TYPES.TranslationService)
  private translationService!: TranslationService;

  public register(app: Application): void {
    app.route("/translateText").post(this.translateText);
  }

  private translateText = async (req: Request, res: Response) => {
    const { inputLanguage, outputLanguage, text } =
      req.body as TranslationPayload;
    try {
      const translated_text = await this.translationService.translateText(
        inputLanguage,
        outputLanguage,
        text
      );
      res.status(200).json({ data: translated_text });
    } catch (e: any) {
      const errorMsg = `Failed to translate from ${inputLanguage} to ${outputLanguage}. ${e.message}`;
      console.error(errorMsg);
      return res.status(500).json({
        message: errorMsg,
      });
    }
  };
}
