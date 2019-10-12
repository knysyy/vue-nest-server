import { Exclude } from 'class-transformer';
import User from '../entity/users.entity';

export class UserResponse extends User {
  @Exclude()
  id: number;

  name: string;

  email: string;

  @Exclude()
  password: string;

  @Exclude()
  token: string;

  constructor(partial: Partial<UserResponse>) {
    super();
    Object.assign(this, partial);
  }
}
