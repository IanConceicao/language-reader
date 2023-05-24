import { inject, injectable } from "inversify";
import TYPES from "../types";
import { QuizRepository } from "../repositories/QuizRepository";

interface Question {
  prompt: string;
  answers: string[];
  correctAnswer: number;
  answerExplanation: string;
}

export interface QuizService {
  createQuiz(language: string, text: string): Promise<Question[]>;
}

@injectable()
export class QuizServiceImpl implements QuizService {
  @inject(TYPES.QuizRepository)
  private quizRepository!: QuizRepository;

  public createQuiz = async (
    language: string,
    text: string
  ): Promise<Question[]> => {
    const quizString = await this.quizRepository.createQuiz(language, text);
    try {
      return JSON.parse(quizString) as Question[];
    } catch (error: any) {
      throw new Error(
        `Failed to parse ChatGPT output into JSON. GPT most likely did not return properly formatted JSON: ${quizString}`
      );
    }
  };
}
