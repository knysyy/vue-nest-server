import { Exclude, Transform } from 'class-transformer';
import Snippet from '../entity/snippets.entity';
import Label from '../../labels/entity/labels.entity';
import Language from '../../languages/entity/languages.entity';
import LanguageResponse from '../../languages/response/language.response';
import LabelResponse from '../../labels/response/label.response';

export default class SnippetResponse extends Snippet {
  @Transform(labels => labels.map(label => new LabelResponse(label)))
  public labels: Label[];

  @Transform(language => new LanguageResponse(language))
  public language?: Language;

  @Exclude()
  public languageId?: number;

  @Exclude()
  public userId: number;

  constructor(partial: Partial<SnippetResponse>) {
    super();
    Object.assign(this, partial);
  }
}
