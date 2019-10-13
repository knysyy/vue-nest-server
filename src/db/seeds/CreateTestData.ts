import { Factory, Seeder, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../../modules/users/entity/users.entity';
import Snippet from '../../modules/snippets/entity/snippets.entity';
import Language from '../../modules/languages/entity/languages.entity';
import Label from '../../modules/labels/entity/labels.entity';

export class CreateTestData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const em = connection.createEntityManager();
    await times(5, async () => {
      const user = await factory(User)().seed();
      const language = await factory(Language)({ userId: user.id }).seed();
      const snippets = await factory(Snippet)({
        userId: user.id,
        languageId: language.id,
      }).seedMany(5);
      const label = await factory(Label)({ userId: user.id }).seed();
      snippets.map(async snippet => {
        snippet.labels = [label];
        await em.save(snippet);
      });
      user.snippets = snippets;
      user.labels = [label];
      user.languages = [language];
      await em.save(user);
    });
  }
}
