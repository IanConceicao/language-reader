import { injectable } from "inversify";
const { Translate } = require("@google-cloud/translate").v2;

export interface TranslationRepository {
  translateText(
    inputLanguageCode: string,
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

  private translate = new Translate({
    credentials: this.CREDENTIALS,
    projectId: this.CREDENTIALS.project_id,
  });

  public async translateText(
    inputLanguageCode: string,
    outputLanguageCode: string,
    text: string
  ): Promise<string> {
    const [translation] = await this.translate.translate(
      text,
      outputLanguageCode
    );
    //TODO: update to advanced translation
    // https://cloud.google.com/translate/docs/advanced/translate-text-advance
    return translation;
  }
}
