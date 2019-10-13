import Label from '../../modules/labels/entity/labels.entity';
import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

define(Label, (faker: typeof Faker, settings: { userId: number }) => {
  const label = new Label();
  label.title = faker.name.title();
  label.userId = settings.userId;
  return label;
});
