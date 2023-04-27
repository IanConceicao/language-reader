import { injectable } from "inversify";
const { TranslationServiceClient } = require("@google-cloud/translate").v3;

export interface TranslationRepository {
  translateText(
    inputLanguageCode: string | null,
    outputLanguageCode: string,
    text: string
  ): Promise<string>;
  detectLanguage(text: string): Promise<string>;
}

@injectable()
export class TranslationRepsositoryGoogleTranslate
  implements TranslationRepository
{
  private CREDENTIALS = JSON.parse(
    process.env.GOOGLE_TRANSLATE_CREDENTIALS || "{}"
  );

  private translationClient = new TranslationServiceClient({
    credentials: this.CREDENTIALS,
    projectId: this.CREDENTIALS.project_id,
  });

  public async translateText(
    inputLanguageCode: string | null,
    outputLanguageCode: string,
    text: string
  ): Promise<string> {
    try {
      const request = {
        parent: `projects/${this.CREDENTIALS.project_id}/locations/global`,
        contents: [text],
        mimeType: "text/plain", // mime types: text/plain, text/html
        sourceLanguageCode: inputLanguageCode,
        targetLanguageCode: outputLanguageCode,
      };

      const [response] = await this.translationClient.translateText(request);
      return response.translations[0].translatedText;
    } catch (e: any) {
      throw Error(
        `Google Translate failed to translate the text: ${e.message}`
      );
    }
  }

  public async detectLanguage(text: string): Promise<string> {
    try {
      const request = {
        parent: `projects/${this.CREDENTIALS.project_id}/locations/global`,
        content: text,
        mimeType: "text/plain", // mime types: text/plain, text/html
      };
      const [response] = await this.translationClient.detectLanguage(request);

      return response.languages[0].languageCode;
    } catch (e: any) {
      throw Error(
        `Googled Translate failed to detect the language: ${e.message}`
      );
    }
  }
}
