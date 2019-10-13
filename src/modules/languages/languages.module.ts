import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Language from './entity/languages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export default class LanguagesModule {}
