import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Snippet from '../../snippets/entity/snippets.entity';
import User from '../../users/entity/users.entity';

@Entity()
export default class Language {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50 })
  public title: string;

  @OneToMany(() => Snippet, snippet => snippet.language)
  snippets: Snippet[];

  @Column('integer', { nullable: false })
  @ManyToOne(() => User, user => user.language)
  user: User;
}
