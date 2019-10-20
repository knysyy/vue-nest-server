import { IsInt, IsOptional } from 'class-validator';

export default class SearchSnippetsDto {
  @IsOptional()
  readonly title?: string;

  @IsOptional()
  readonly description?: string;

  @IsOptional()
  readonly content?: string;

  @IsOptional()
  readonly favorite?: boolean;

  @IsOptional()
  @IsInt({ each: true })
  readonly languageIds?: number[];

  @IsOptional()
  @IsInt({
    each: true,
  })
  readonly labelIds?: number[];
}
