import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import LanguagesService from './languages.service';
import { AuthGuard } from '@nestjs/passport';
import LanguageResponse from './response/language.response';
import LanguagesResponse from './response/languages.response';

@Controller('languages')
export default class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<LanguagesResponse> {
    const languages = await this.languagesService.findAll();
    return new LanguagesResponse(
      languages.map(language => new LanguageResponse(language)),
    );
  }
}
