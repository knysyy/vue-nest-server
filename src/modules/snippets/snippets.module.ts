import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Snippet from "./entity/snippets.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Snippet])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class SnippetsModule {}
