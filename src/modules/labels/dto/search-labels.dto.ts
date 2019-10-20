import { IsOptional } from 'class-validator';

export default class SearchLabelsDto {
  @IsOptional()
  readonly title?: string;
}
