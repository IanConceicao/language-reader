import { inject, injectable } from "inversify";
import TYPES from "../types";
import { QuizRepository } from "../repositories/QuizRepository";
import { TranslationService } from "./TranslationService";
import { exampleQuiz } from "../data/exampleQuiz";

interface Question {
  prompt: string;
  answers: string[];
  correctAnswer: number;
  answerExplanation: string;
}

export interface QuizService {
  createQuiz(language: string, text: string): Promise<Question[]>;
  translateAndCreateQuiz(
    inputLanguage: string | null,
    outputLanguage: string,
    text: string,
    mock: boolean | null
  ): Promise<Question[]>;
}

@injectable()
export class QuizServiceImpl implements QuizService {
  @inject(TYPES.QuizRepository)
  private quizRepository!: QuizRepository;

  @inject(TYPES.TranslationService)
  private translationService!: TranslationService;

  public createQuiz = async (
    language: string,
    text: string
  ): Promise<Question[]> => {
    const quizString = await this.quizRepository.createQuiz(language, text);
    try {
      return JSON.parse(quizString) as Question[];
    } catch (error: any) {
      throw new Error(
        `Failed to parse ChatGPT output into JSON. GPT most likely did not return properly formatted JSON:\n${quizString}`
      );
    }
  };

  public translateAndCreateQuiz = async (
    inputLanguage: string | null,
    outputLanguage: string,
    text: string,
    mock: boolean | null
  ): Promise<Question[]> => {
    if (mock) {
      await new Promise((r) => setTimeout(r, 4000)); // Mimic API call delay
      return exampleQuiz;
    } else {
      const translatedText = await this.translationService.translateText(
        inputLanguage,
        outputLanguage,
        text
      );
      return await this.createQuiz(outputLanguage, translatedText);
    }
  };
}
