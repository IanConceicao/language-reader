import { injectable } from "inversify";
const { TranslationServiceClient } = require("@google-cloud/translate").v3;

export interface TranslationRepository {
  translateText(
    inputLanguageCode: string | null,
    outputLanguageCode: string,
    text: string
  ): Promise<string>;
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
    const request = {
      parent: `projects/${this.CREDENTIALS.project_id}/locations/global`,
      contents: [text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: inputLanguageCode,
      targetLanguageCode: outputLanguageCode,
    };

    const [response] = await this.translationClient.translateText(request);

    try {
      return response.translations[0].translatedText;
    } catch {
      throw Error("No translation returned");
    }
  }
}
