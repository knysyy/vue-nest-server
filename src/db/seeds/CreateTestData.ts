import { Factory, Seeder, times } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import User from '../../modules/users/entity/users.entity';
import Snippet from '../../modules/snippets/entity/snippets.entity';
import Label from '../../modules/labels/entity/labels.entity';
import * as HighLightJS from 'highlight.js';
import Language from '../../modules/languages/entity/languages.entity';

export class CreateTestData implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const em = connection.createEntityManager();
    await times(5, async () => {
      const user = await factory(User)().seed();
      const snippets = await factory(Snippet)({
        userId: user.id,
      }).seedMany(5);
      const label = await factory(Label)({ userId: user.id }).seed();
      snippets.map(async snippet => {
        snippet.labels = [label];
        await em.save(snippet);
      });
      user.snippets = snippets;
      user.labels = [label];
      await em.save(user);
    });
    const languageList: string[] = HighLightJS.listLanguages();
    for (const lang of languageList) {
      await factory(Language)({ title: lang }).seed();
    }
  }
}
