import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Snippet from './entity/snippets.entity';
import SnippetsService from './snippets.service';
import SnippetsController from './snippets.controller';
import LanguagesModule from '../languages/languages.module';
import LabelsModule from '../labels/labels.module';

@Module({
  imports: [TypeOrmModule.forFeature([Snippet]), LanguagesModule, LabelsModule],
  providers: [SnippetsService],
  controllers: [SnippetsController],
  exports: [TypeOrmModule, SnippetsService],
})
export default class SnippetsModule {}
