import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import LanguagesService from './languages.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import LanguageResponse from './response/language.response';
import LanguagesResponse from './response/languages.response';
import CreateLanguageDto from './dto/create-language.dto';

@Controller('languages')
export default class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@User('id') userId: number): Promise<LanguagesResponse> {
    const languages = await this.languagesService.findAll(userId);
    return new LanguagesResponse(
      languages.map(language => new LanguageResponse(language)),
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createLanguage(
    @User('id') userId: number,
    @Body() languageDto: CreateLanguageDto,
  ) {
    const language = await this.languagesService.createLanguage(
      userId,
      languageDto,
    );
    return new LanguageResponse(language);
  }
}
