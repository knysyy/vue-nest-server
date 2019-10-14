import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import SnippetsService from './snippets.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import SnippetsResponse from './response/snippets.response';
import SnippetResponse from './response/snippet.response';
import CreateSnippetDto from './dto/create-snippet.dto';

@Controller('snippets')
export default class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@User('id') userId: number): Promise<SnippetsResponse> {
    const snippets = await this.snippetsService.findAll(userId);
    return new SnippetsResponse(
      snippets.map(snippet => new SnippetResponse(snippet)),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post()
  async createSnippet(
    @User('id') userId: number,
    @Body() snippetDto: CreateSnippetDto,
  ): Promise<SnippetResponse> {
    const snippet = await this.snippetsService.createSnippet(
      userId,
      snippetDto,
    );
    return new SnippetResponse(snippet);
  }
}
