import Label from '../entity/labels.entity';
import { Exclude } from 'class-transformer';

export default class LabelResponse extends Label {
  id: number;

  title: string;

  @Exclude()
  userId: number;

  constructor(partial: Partial<LabelResponse>) {
    super();
    Object.assign(this, partial);
  }
}
