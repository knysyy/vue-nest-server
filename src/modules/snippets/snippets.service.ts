import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Snippet from './entity/snippets.entity';
import { Repository } from 'typeorm';
import CreateSnippetDto from './dto/create-snippet.dto';
import LanguagesService from '../languages/languages.service';
import LabelsService from '../labels/labels.service';

@Injectable()
export default class SnippetsService {
  constructor(
    @InjectRepository(Snippet)
    private readonly snippetRepository: Repository<Snippet>,
    private readonly languagesService: LanguagesService,
    private readonly labelsService: LabelsService,
  ) {}

  async findAll(userId: number): Promise<Snippet[]> {
    return this.snippetRepository.find({
      where: { userId },
      order: {
        id: 'DESC',
      },
      relations: ['labels', 'language'],
    });
  }

  async createSnippet(
    userId: number,
    snippetDto: CreateSnippetDto,
  ): Promise<Snippet | undefined> {
    const { languageId, labelIds, ...reqSnippet } = snippetDto;
    const snippet = this.snippetRepository.create(reqSnippet);

    snippet.language = languageId
      ? await this.languagesService.findById(userId, languageId)
      : undefined;
    snippet.labels = labelIds
      ? await this.labelsService.findByIds(labelIds)
      : [];
    snippet.userId = userId;

    return this.snippetRepository.save(snippet);
  }
}
