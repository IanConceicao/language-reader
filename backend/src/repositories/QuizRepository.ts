import { injectable } from "inversify";
const { Configuration, OpenAIApi } = require("openai");
import { dedent } from "ts-dedent";

export interface QuizRepository {
  createQuiz(language: string, text: string): Promise<string>;
}

@injectable()
export class QuizRepositoryChatGPT implements QuizRepository {
  private openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
  );

  public async createQuiz(language: string, text: string): Promise<string> {
    try {
      const prompt = dedent`
        Read the article below and create a quiz with 4 questions and 4 answers per question. The article is in ${language}, so also write the quiz in ${language}. Return the quiz in JSON as a list of Questions, where a Question is defined as:

        interface Question {
        prompt: string;
        answers: string[];
        correctAnswer: number;  // The index of the correct answer
        answerExplanation: string;
        }
      
        Article: 
        ${text}
        `;

      const theResponse = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });
      return theResponse.data.choices[0].message.content;
    } catch (e: any) {
      const errorMsg = e.response
        ? JSON.stringify(e.response.data.error.message)
        : e.message;
      throw Error(
        `ChatGPT failed to generate the quiz in language ${language} ${errorMsg}. Response status: ${e.response.status}`
      );
    }
  }
}
