import { Controller, Get, Query } from '@nestjs/common';
import { PromptManager } from '../managers';
import { ApiTags } from '@nestjs/swagger';
import { xaiAdminRoutes } from 'src/api';
import { QueryPetOptions } from '@xtsai/ai-orm';

@ApiTags(`${xaiAdminRoutes.AIBot.desc} Prompt`)
@Controller('prompt')
export class PromptController {
  constructor(private readonly manager: PromptManager) {}

  @Get('list')
  list(@Query() dto: QueryPetOptions) {
    return this.manager.pagelist(dto);
  }
}
