import { Injectable } from '@nestjs/common';
import { PromptService, QueryPetOptions } from '@xtsai/ai-orm';

@Injectable()
export class PromptManager {
  constructor(private readonly service: PromptService) {}

  pagelist(queryDto: QueryPetOptions) {
    return this.service.list(queryDto);
  }
}
