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
  detectLanguage(text: string): Promise<string>;
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

  public detectLanguage = async (text: string): Promise<string> => {
    const MAX_TEXT_LENGTH = 60; // Arbitrary limit, because not that many characters are needed for language detection,
    // and we pay per character

    return this.getLanguageFromIso(
      await this.translationRepository.detectLanguage(
        text.substring(0, MAX_TEXT_LENGTH)
      )
    );
  };

  private getIsoForLanguage = (language: string): string => {
    if (!(language in codes)) {
      throw new Error(`Cannot find ISO-639-1 code for language: ${language}`);
    } else {
      return codes[language];
    }
  };

  private getLanguageFromIso = (ISOCode: string): string => {
    for (const language in codes) {
      if (codes[language] === ISOCode) {
        return language;
      }
    }
    throw new Error(`Cannot find language for ISO-639-1 code: ${ISOCode}`);
  };
}
