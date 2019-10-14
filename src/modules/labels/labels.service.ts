import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Label from './entity/labels.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export default class LabelsService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  async findALl(userId: number): Promise<Label[]> {
    return this.labelRepository.find({
      where: { userId },
      order: {
        id: 'DESC',
      },
    });
  }

  async findByIds(userId: number, labelIds: number[]): Promise<Label[]> {
    return this.labelRepository.findByIds(labelIds, {
      where: {
        userId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async findByTitle(userId: number, text: string): Promise<Label[]> {
    return this.labelRepository.find({
      where: {
        userId,
        title: Like(`%${text}%`),
      },
      order: {
        id: 'DESC',
      },
    });
  }
}
