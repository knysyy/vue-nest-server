import { IsNotEmpty, IsNumber } from 'class-validator';
import CreateSnippetDto from './create-snippet.dto';

export default class EditSnippetDto extends CreateSnippetDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
