import { IsOptional, MinLength } from 'class-validator';

export default class SearchLanguagesDto {
  @IsOptional()
  @MinLength(3)
  readonly title?: string;
}
