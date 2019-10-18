import { IsOptional, MinLength } from 'class-validator';

export default class SearchLabelsDto {
  @IsOptional()
  @MinLength(3)
  readonly title?: string;
}
