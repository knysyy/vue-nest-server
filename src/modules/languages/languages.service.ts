import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Language from './entity/languages.entity';
import { Repository } from 'typeorm';
import CreateLanguageDto from './dto/create-language.dto';

@Injectable()
export default class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(userId: number): Promise<Language[]> {
    return this.languageRepository.find({
      where: { userId },
      order: {
        id: 'DESC',
      },
    });
  }

  async findById(
    userId: number,
    languageId: number,
  ): Promise<Language | undefined> {
    return this.languageRepository.findOne({
      where: {
        id: languageId,
        userId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async createLanguage(
    userId: number,
    languageDto: CreateLanguageDto,
  ): Promise<Language | undefined> {
    const language = await this.languageRepository.create(languageDto);
    language.userId = userId;
    return this.languageRepository.save(language);
  }
}
