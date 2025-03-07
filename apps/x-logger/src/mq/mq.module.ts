import { Module } from '@nestjs/common';
import { SystemLogConsumerService } from './log.consumer';

@Module({
  imports: [],
  providers: [SystemLogConsumerService],
})
export class MqModule {}
