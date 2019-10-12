import { SnippetResponse } from './snippet.response';
import { Type } from 'class-transformer';

export class SnippetsResponse {
  @Type(() => SnippetResponse)
  public snippets: SnippetResponse[];

  constructor(snippetResponses: SnippetResponse[]) {
    this.snippets = snippetResponses;
  }
}
