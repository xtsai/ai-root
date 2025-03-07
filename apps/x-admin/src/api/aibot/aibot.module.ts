import { Module } from '@nestjs/common';
import { PromptController } from './controllers/prompt.controller';
import { PromptManager } from './managers';

@Module({
  controllers: [PromptController],
  providers: [PromptManager],
})
export class AibotModule {}
