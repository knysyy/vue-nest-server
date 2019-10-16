import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export default class SearchSnippetsDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly content?: string;

  @IsOptional()
  @IsBoolean()
  readonly favorite?: boolean;

  @IsOptional()
  @IsInt({ each: true })
  readonly languageIds?: number[];

  @IsOptional()
  @IsInt({ each: true })
  readonly labelIds?: number[];
}
