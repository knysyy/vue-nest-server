import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import SnippetsService from './snippets.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import SnippetsResponse from './response/snippets.response';
import SnippetResponse from './response/snippet.response';

@Controller('snippets')
export default class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getSnippets(@User('id') userId: number): Promise<SnippetsResponse> {
    const snippets = await this.snippetsService.getSnippets(userId);
    return new SnippetsResponse(
      snippets.map(snippet => new SnippetResponse(snippet)),
    );
  }
}
