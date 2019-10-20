import { Body, ClassSerializerInterceptor, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import SnippetsService from './snippets.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import SnippetsResponse from './response/snippets.response';
import SnippetResponse from './response/snippet.response';
import CreateSnippetDto from './dto/create-snippet.dto';
import SearchSnippetsDto from './dto/search-snippets.dto';
import FavoriteSnippetDto from './dto/favorite-snippet.dto';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';

@Controller('snippets')
export default class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('search')
  async find(
    @User('id') userId: number,
    @Body() searchSnippetsDto: SearchSnippetsDto,
  ): Promise<SnippetsResponse> {
    const snippets = await this.snippetsService.find(userId, searchSnippetsDto);
    return new SnippetsResponse(
      snippets.map(snippet => new SnippetResponse(snippet)),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('create')
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

  @UseGuards(AuthGuard('jwt'))
  @Get('delete/:id')
  async deleteSnippet(
    @User('id') userId: number,
    @Param('id', new ParseIntPipe()) snippetId: number,
  ): Promise<void> {
    await this.snippetsService.deleteSnippet(userId, snippetId);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Post('favorite')
  async toggleFavoriteSnippet(
    @User('id') userId: number,
    @Body() favoriteSnippetDto: FavoriteSnippetDto,
  ): Promise<void> {
    await this.snippetsService.favoriteSnippet(userId, favoriteSnippetDto);
  }
}
