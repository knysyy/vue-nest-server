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

  @Column('integer', { nullable: false })
  public userId: number;

  @ManyToMany(() => Snippet, snippet => snippet.labels)
  public snippets: Snippet[];

  @ManyToOne(() => User, user => user.snippets)
  public user: User;
}
