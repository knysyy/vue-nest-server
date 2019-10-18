import { IsOptional, IsString } from 'class-validator';

export default class SearchLabelsDto {
  @IsOptional()
  @IsString()
  readonly title?: string;
}
