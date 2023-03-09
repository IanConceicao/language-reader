import { inject, injectable } from "inversify";
import { codes } from "../data/countries_to_ISO_639";
import { TranslationRepository } from "../repositories/TranslationRepository";
import TYPES from "../types";

export interface TranslationService {
  translateText(
    inputLanguage: string | null,
    outputLanguage: string,
    inputText: string
  ): Promise<string>;
}

@injectable()
export class TranslationServiceImpl implements TranslationService {
  @inject(TYPES.TranslationRepository)
  private translationRepository!: TranslationRepository;

  public translateText = async (
    inputLanguage: string | null,
    outputLanguage: string,
    inputText: string
  ): Promise<string> => {
    const inputCode =
      inputLanguage === null ? null : this.getIsoForLanguage(inputLanguage);
    const outputCode = this.getIsoForLanguage(outputLanguage);

    return await this.translationRepository.translateText(
      inputCode,
      outputCode,
      inputText
    );
  };

  private getIsoForLanguage = (language: string): string => {
    if (!(language in codes)) {
      throw new Error(`Cannot find ISO-639-1 code for language: ${language}`);
    } else {
      return codes[language];
    }
  };
}
