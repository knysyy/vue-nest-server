import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Label from "./entity/labels.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Label])],
  providers: [],
  controllers: [],
  exports: [TypeOrmModule],
})
export class LabelsModule {}
