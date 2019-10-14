import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Label from './entity/labels.entity';
import LabelsService from './labels.service';
import LabelsController from './labels.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  providers: [LabelsService],
  controllers: [LabelsController],
  exports: [TypeOrmModule, LabelsService],
})
export default class LabelsModule {}
