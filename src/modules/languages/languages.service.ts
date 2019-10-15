import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Language from './entity/languages.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<Language[]> {
    return this.languageRepository.find({
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
}
