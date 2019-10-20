import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Language from './entity/languages.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export default class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<Language[]> {
    return this.languageRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findById(languageId: number): Promise<Language | undefined> {
    return this.languageRepository.findOne({
      where: {
        id: languageId,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findByTitle(title: string): Promise<Language[]> {
    return this.languageRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
