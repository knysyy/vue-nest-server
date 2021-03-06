import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Snippet from './entity/snippets.entity';
import { Repository } from 'typeorm';
import CreateSnippetDto from './dto/create-snippet.dto';
import LanguagesService from '../languages/languages.service';
import LabelsService from '../labels/labels.service';
import SearchSnippetsDto from './dto/search-snippets.dto';
import FavoriteSnippetDto from './dto/favorite-snippet.dto';
import EditSnippetDto from './dto/edit-snippet.dto';

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
      query = query.andWhere('snippet.languageId IN (:...languageIds)', {
        languageIds,
      });
    }

    if (labelIds !== undefined && labelIds.length > 0) {
      query = query.andWhere(qb => {
        const subQuery = qb
          .subQuery()
          .select('snippet_label.snippetId')
          .from('snippet_labels_label', 'snippet_label')
          .where('snippet_label.labelId IN (:...labelIds)', {
            labelIds,
          })
          .getQuery();
        return 'snippet.id IN ' + subQuery;
      });
    }

    query.orderBy('snippet.id', 'DESC');
    return query.getMany();
  }

  async createSnippet(
    userId: number,
    snippetDto: CreateSnippetDto,
  ): Promise<Snippet> {
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

  async deleteSnippet(userId: number, snippetId: number): Promise<void> {
    const result = await this.snippetRepository.delete({
      userId,
      id: snippetId,
    });

    if (result.affected === 0) {
      throw new BadRequestException();
    }
  }

  async favoriteSnippet(
    userId: number,
    favoriteSnippetDto: FavoriteSnippetDto,
  ): Promise<void> {
    const { id, favorite } = favoriteSnippetDto;
    const result = await this.snippetRepository.update(
      {
        userId,
        id,
      },
      {
        favorite,
      },
    );
    if (result.affected === 0) {
      throw new BadRequestException();
    }
  }

  async editSnippet(
    userId: number,
    editSnippetDto: EditSnippetDto,
  ): Promise<Snippet> {
    const { id, languageId, labelIds, ...reqSnippet } = editSnippetDto;
    const snippet = await this.snippetRepository.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!snippet) {
      throw new BadRequestException();
    }
    snippet.language = languageId
      ? await this.languagesService.findById(languageId)
      : undefined;
    snippet.labels = labelIds
      ? await this.labelsService.findByIds(labelIds)
      : [];
    Object.assign(snippet, reqSnippet);
    return this.snippetRepository.save(snippet);
  }

  addPercentSign(text?: string): string {
    return `%${text}%`;
  }
}
