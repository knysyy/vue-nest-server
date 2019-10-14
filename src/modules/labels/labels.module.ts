import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Label from './entity/labels.entity';
import LabelsService from './labels.service';

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  providers: [LabelsService],
  controllers: [],
  exports: [TypeOrmModule, LabelsService],
})
export default class LabelsModule {}
