import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../../users/entity/users.entity";
import Label from "../../labels/entity/labels.entity";
import Language from "../../languages/entity/languages.entity";

@Entity()
export default class Snippet {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50 })
  public title: string;

  @Column({ length: 255 })
  public description: string;

  @Column({ type: "text" })
  public content: string;

  @ManyToMany(type => Label, label => label.snippets)
  @JoinTable()
  labels: Label[];

  @ManyToOne(type => Language, language => language.snippets)
  language?: Language;

  @ManyToOne(type => User, user => user.snippets)
  user: User;
}
