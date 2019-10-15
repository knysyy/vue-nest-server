import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Snippet from '../../snippets/entity/snippets.entity';

@Entity()
export default class Language {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 50 })
  public title: string;

  @OneToMany(() => Snippet, snippet => snippet.language)
  public snippets: Snippet[];
}
