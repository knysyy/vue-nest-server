import { define } from 'typeorm-seeding';
import Language from '../../modules/languages/entity/languages.entity';
import * as Faker from 'faker';

define(Language, (faker: typeof Faker, settings: { title: string }) => {
  const language = new Language();
  language.title = settings.title;
  return language;
});
