import Snippet from '../../modules/snippets/entity/snippets.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Snippet, (
  faker: typeof Faker,
  settings: { userId: number; languageId?: number },
) => {
  const snippet = new Snippet();
  snippet.title = faker.name.title();
  snippet.description = faker.random.alphaNumeric(20);
  snippet.content = faker.random.alphaNumeric(30);
  snippet.userId = settings.userId;
  snippet.languageId = settings.languageId;
  return snippet;
});
