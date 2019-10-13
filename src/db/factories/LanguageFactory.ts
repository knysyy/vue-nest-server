import { define } from 'typeorm-seeding';
import Language from '../../modules/languages/entity/languages.entity';
import * as Faker from 'faker';

define(Language, (faker: typeof Faker, settings: { userId: number }) => {
  const language = new Language();
  language.title = faker.name.title();
  language.userId = settings.userId;
  return language;
});
