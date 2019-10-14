import { IsNotEmpty, MaxLength } from 'class-validator';

export default class CreateLabelDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;
}
