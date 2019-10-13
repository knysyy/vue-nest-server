import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../users/entity/users.entity';
import Label from '../../labels/entity/labels.entity';
import Language from '../../languages/entity/languages.entity';

@Entity()
export default class Snippet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50, nullable: false })
  public title: string;

  @Column({ length: 255, nullable: true })
  public description: string;

  @Column({ type: 'text', nullable: false })
  public content: string;

  @Column({ default: false, nullable: false })
  public favorite: boolean;

  @Column('integer', { nullable: true })
  public languageId?: number;

  @Column('integer', { nullable: false })
  public userId: number;

  @ManyToMany(() => Label, label => label.snippets)
  @JoinTable()
  public labels: Label[];

  @ManyToOne(() => Language, language => language.snippets)
  public language?: Language;

  @ManyToOne(() => User, user => user.snippets)
  public user: User;
}
