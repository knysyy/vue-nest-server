import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export default class CreateSnippetDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly title: string;

  @IsString()
  @MaxLength(255)
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsOptional()
  @IsNumber()
  readonly languageId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  readonly labelIds: number[];
}
