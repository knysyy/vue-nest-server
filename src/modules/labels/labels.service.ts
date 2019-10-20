import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findByTitle(userId: number, title: string): Promise<Label[]> {
    return this.labelRepository.find({
      where: {
        userId,
        title: Like(`%${title}%`),
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

  async deleteLabel(userId: number, labelId: number): Promise<void> {
    const result = await this.labelRepository.delete({
      userId,
      id: labelId,
    });

    if (result.affected === 0) {
      throw new BadRequestException();
    }
  }
}
