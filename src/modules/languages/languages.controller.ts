import { CacheInterceptor, ClassSerializerInterceptor, Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import LanguagesService from './languages.service';
import { AuthGuard } from '@nestjs/passport';
import LanguageResponse from './response/language.response';
import LanguagesResponse from './response/languages.response';
import SearchLanguagesDto from './dto/search-languages.dto';

@Controller('languages')
export default class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(CacheInterceptor)
  @Get()
  async find(
    @Query() searchLanguagesDto: SearchLanguagesDto,
  ): Promise<LanguagesResponse> {
    const title = searchLanguagesDto.title;
    const languages = title
      ? await this.languagesService.findByTitle(title)
      : await this.languagesService.findAll();
    return new LanguagesResponse(
      languages.map(language => new LanguageResponse(language)),
    );
  }
}
