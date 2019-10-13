import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Snippet from '../../snippets/entity/snippets.entity';
import Label from '../../labels/entity/labels.entity';
import Language from '../../languages/entity/languages.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 30 })
  public name: string;

  @Column({ length: 255, unique: true })
  public email: string;

  @Column({ length: 80 })
  public password: string;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  public token: string;

  @OneToMany(() => Snippet, snippet => snippet.user)
  public snippets: Snippet[];

  @OneToMany(() => Label, label => label.user)
  public labels: Label[];

  @OneToMany(() => Language, language => language.user)
  public languages: Language[];

  setProperty(properties: Partial<User>) {
    Object.assign(this, properties);
  }
}
