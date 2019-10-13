import Snippet from '../entity/snippets.entity';
import { Exclude, Transform, Type } from 'class-transformer';
import Label from '../../labels/entity/labels.entity';
import Language from '../../languages/entity/languages.entity';
import User from '../../users/entity/users.entity';

export default class SnippetResponse extends Snippet {
  @Type(() => Label)
  @Transform(label => label.title)
  public labels: Label[];

  @Transform(language => language.title)
  public language?: Language;

  @Exclude()
  public use: User;

  constructor(partial: Partial<SnippetResponse>) {
    super();
    Object.assign(this, partial);
  }
}
