import { IsInt, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export default class CreateSnippetDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @MaxLength(255)
  readonly description: string;

  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @IsInt()
  readonly languageId?: number;

  @IsOptional()
  @IsInt({
    each: true,
  })
  readonly labelIds?: number[];
}
