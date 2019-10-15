import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Label from './entity/labels.entity';
import { Like, Repository } from 'typeorm';
import CreateLabelDto from './dto/create-label.dto';

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

  async findByIds(labelIds: number[]): Promise<Label[]> {
    return this.labelRepository.findByIds(labelIds, {
      order: {
        id: 'DESC',
      },
    });
  }

  async findByTitle(text: string): Promise<Label[]> {
    return this.labelRepository.find({
      where: {
        title: Like(`%${text}%`),
      },
      order: {
        id: 'DESC',
      },
    });
  }

  async createLabel(
    userId: number,
    labelDto: CreateLabelDto,
  ): Promise<Label | undefined> {
    const label = await this.labelRepository.create(labelDto);
    label.userId = userId;
    return this.labelRepository.save(label);
  }
}
