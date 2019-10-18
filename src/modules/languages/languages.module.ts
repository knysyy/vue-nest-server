import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Language from './entity/languages.entity';
import LanguagesService from './languages.service';
import LanguagesController from './languages.controller';
import MyCacheModule from '../cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([Language]), MyCacheModule],
  providers: [LanguagesService],
  controllers: [LanguagesController],
  exports: [TypeOrmModule, LanguagesService],
})
export default class LanguagesModule {}
