import { IsOptional } from 'class-validator';

export default class SearchLanguagesDto {
  @IsOptional()
  readonly title?: string;
}
