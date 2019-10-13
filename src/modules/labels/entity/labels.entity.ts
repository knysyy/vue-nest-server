import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Snippet from '../../snippets/entity/snippets.entity';
import User from '../../users/entity/users.entity';

@Entity()
export default class Label {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50 })
  public title: string;

  @ManyToMany(() => Snippet, snippet => snippet.labels)
  snippets: Snippet[];

  @Column('integer', { nullable: false })
  @ManyToOne(() => User, user => user.snippets)
  user: User;
}
