import { IsBoolean, IsNotEmpty } from 'class-validator';

export default class FavoriteSnippetDto {
  @IsNotEmpty()
  readonly id: number;

  @IsBoolean()
  @IsNotEmpty()
  readonly favorite: boolean;
}
