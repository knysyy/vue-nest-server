import Label from '../entity/labels.entity';
import { Exclude } from 'class-transformer';
import Snippet from '../../snippets/entity/snippets.entity';
import User from '../../users/entity/users.entity';

export class LabelsResponse extends Label {
  @Exclude()
  id: number;

  title: string;

  @Exclude()
  snippets: Snippet[];

  @Exclude()
  user: User;
}
