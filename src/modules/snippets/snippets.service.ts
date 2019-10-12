import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Snippet from "./entity/snippets.entity";
import { Repository } from "typeorm";

@Injectable()
export class SnippetsService {
  constructor(
    @InjectRepository(Snippet)
    private readonly snippetRepository: Repository<Snippet>,
  ) {}

  async getSnippets(userId: number): Promise<Snippet[]> {
    return this.snippetRepository.find({
      where: { userId },
      relations: ["labels", "language"],
    });
  }
}
