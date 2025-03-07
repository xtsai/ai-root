import { Module } from '@nestjs/common';
import { BotOrmService } from './services/bot-orm.service';

@Module({
  providers: [BotOrmService],
  exports: [BotOrmService],
})
export class BotOrmModule {}
