import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from 'class-validator';

export default class CreateSnippetDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @MaxLength(255)
  readonly description: string;

  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @IsNumber()
  readonly languageId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly labelIds: number[];
}
