import { IsOptional, IsString } from 'class-validator';

export default class SearchLanguagesDto {
  @IsOptional()
  @IsString()
  readonly title?: string;
}
