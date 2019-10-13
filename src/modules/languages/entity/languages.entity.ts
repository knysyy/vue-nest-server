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

  @Column('integer', { nullable: false })
  public userId: number;

  @OneToMany(() => Snippet, snippet => snippet.language)
  public snippets: Snippet[];

  @ManyToOne(() => User, user => user.languages)
  public user: User;
}
