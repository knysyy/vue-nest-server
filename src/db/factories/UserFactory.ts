import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import * as uuid from 'uuid';
import User from '../../modules/users/entity/users.entity';
import * as bcrypt from 'bcryptjs';

define(User, (faker: typeof Faker) => {
  const user = new User();
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  user.name = faker.internet.userName(firstName, lastName);
  user.email = faker.internet.email(firstName, lastName);
  user.token = uuid.v4();
  user.password = bcrypt.hashSync('test1234', bcrypt.genSaltSync(10));
  return user;
});
