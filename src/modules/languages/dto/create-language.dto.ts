import { IsNotEmpty, MaxLength } from 'class-validator';

export default class CreateLanguageDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;
}
