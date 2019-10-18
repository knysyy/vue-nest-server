import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Snippet from './entity/snippets.entity';
import { Repository } from 'typeorm';
import CreateSnippetDto from './dto/create-snippet.dto';
import LanguagesService from '../languages/languages.service';
import LabelsService from '../labels/labels.service';
import SearchSnippetsDto from './dto/search-snippets.dto';

@Injectable()
export default class SnippetsService {
  constructor(
    @InjectRepository(Snippet)
    private readonly snippetRepository: Repository<Snippet>,
    private readonly languagesService: LanguagesService,
    private readonly labelsService: LabelsService,
  ) {}

  async find(
    userId: number,
    searchSnippetsDto: SearchSnippetsDto,
  ): Promise<Snippet[]> {
    const {
      title,
      description,
      content,
      favorite,
      languageIds,
      labelIds,
    } = searchSnippetsDto;
    let query = this.snippetRepository
      .createQueryBuilder('snippet')
      .leftJoinAndSelect('snippet.labels', 'label')
      .leftJoinAndSelect('snippet.language', 'language')
      .where({
        userId,
      });

    if (title) {
      query = query.andWhere('snippet.title LIKE :title', {
        title: this.addPercentSign(title),
      });
    }

    if (description) {
      query = query.andWhere('snippet.description LIKE :description', {
        description: this.addPercentSign(description),
      });
    }

    if (content) {
      query = query.andWhere('snippet.content LIKE :content', {
        content: this.addPercentSign(content),
      });
    }

    if (favorite !== undefined && favorite !== null) {
      query = query.andWhere('snippet.favorite = :favorite', {
        favorite,
      });
    }

    if (languageIds !== undefined && languageIds.length > 0) {
      query = query.andWhere('language.id IN (:...languageIds)', {
        languageIds,
      });
    }

    if (labelIds !== undefined && labelIds.length > 0) {
      query = query.andWhere('label.id IN (:...labelIds)', {
        labelIds,
      });
    }

    query.orderBy('snippet.id');
    return query.getMany();
  }

  async createSnippet(
    userId: number,
    snippetDto: CreateSnippetDto,
  ): Promise<Snippet | undefined> {
    const { languageId, labelIds, ...reqSnippet } = snippetDto;
    const snippet = this.snippetRepository.create(reqSnippet);

    snippet.language = languageId
      ? await this.languagesService.findById(languageId)
      : undefined;
    snippet.labels = labelIds
      ? await this.labelsService.findByIds(labelIds)
      : [];
    snippet.userId = userId;

    return this.snippetRepository.save(snippet);
  }

  addPercentSign(text?: string): string {
    return `%${text}%`;
  }
}
