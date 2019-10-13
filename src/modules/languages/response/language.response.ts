import { Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import Language from '../entity/languages.entity';

@Entity()
export default class LanguageResponse extends Language {
  id: number;

  title: string;

  @Exclude()
  userId: number;

  constructor(partial: Partial<LanguageResponse>) {
    super();
    Object.assign(this, partial);
  }
}
