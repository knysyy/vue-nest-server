import { Type } from 'class-transformer';
import LanguageResponse from './language.response';

export default class LanguagesResponse {
  @Type(() => LanguageResponse)
  public languages: LanguageResponse[];

  constructor(languageResponses: LanguageResponse[]) {
    this.languages = languageResponses;
  }
}
