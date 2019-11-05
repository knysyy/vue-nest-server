import SnippetResponse from './snippet.response';
import { Exclude, Type } from 'class-transformer';
import { Pagination } from 'nestjs-typeorm-paginate';
import Snippet from '../entity/snippets.entity';
import { Omit } from '../../../Types/paginate.types';

export default class SnippetsResponse
  implements Omit<Pagination<Snippet>, 'items'> {
  @Type(() => SnippetResponse)
  public snippets: SnippetResponse[];

  itemCount: number;

  pageCount: number;

  totalItems: number;

  @Exclude()
  next: string;

  @Exclude()
  previous: string;

  constructor(
    snippetResponses: SnippetResponse[],
    rest: Omit<Pagination<Snippet>, 'items'>,
  ) {
    this.snippets = snippetResponses;
    Object.assign(this, rest);
  }
}
