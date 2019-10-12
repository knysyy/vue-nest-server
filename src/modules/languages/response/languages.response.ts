import { Entity } from "typeorm";
import { Exclude } from "class-transformer";
import Language from "../entity/languages.entity";
import Snippet from "../../snippets/entity/snippets.entity";
import User from "../../users/entity/users.entity";

@Entity()
export default class LanguagesResponse extends Language {
  @Exclude()
  id: number;

  title: string;

  @Exclude()
  snippets: Snippet[];

  @Exclude()
  user: User;
}
