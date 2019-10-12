import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Snippet from "./entity/snippets.entity";
import { SnippetsService } from "./snippets.service";
import { SnippetsController } from "./snippets.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Snippet])],
  providers: [SnippetsService],
  controllers: [SnippetsController],
  exports: [TypeOrmModule, SnippetsService],
})
export class SnippetsModule {}
