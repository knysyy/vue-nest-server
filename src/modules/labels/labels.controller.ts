import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import LabelsService from './labels.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../decorators/user.decorator';
import LabelsResponse from './response/labels.response';
import LabelResponse from './response/label.response';
import CreateLabelDto from './dto/create-label.dto';

@Controller('labels')
export default class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@User('id') userId: number): Promise<LabelsResponse> {
    const labels = await this.labelsService.findALl(userId);
    return new LabelsResponse(labels.map(label => new LabelResponse(label)));
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async createLabel(
    @User('id') userId: number,
    @Body() labelDto: CreateLabelDto,
  ) {
    const label = await this.labelsService.createLabel(
      userId,
      labelDto,
    );
    return new LabelResponse(label);
  }
}
