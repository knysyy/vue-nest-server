import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Snippet from "../../snippets/entity/snippets.entity";
import Label from "../../labels/entity/labels.entity";
import Language from "../../languages/entity/languages.entity";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 30 })
  public name: string;

  @Column({ length: 255, unique: true })
  public email: string;

  @Column({ length: 80 })
  public password: string;

  @Column({ type: "uuid", default: () => "uuid_generate_v4()" })
  public token: string;

  @OneToMany(type => Snippet, snippet => snippet.user)
  snippets: Snippet[];

  @OneToMany(type => Label, label => label.user)
  labels: Label[];

  @OneToMany(type => Language, language => language.user)
  language: Snippet[];

  setProperty(properties: Partial<User>) {
    Object.assign(this, properties);
  }
}
