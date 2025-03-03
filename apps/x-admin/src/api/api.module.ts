import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { SystemModule } from '@xtsai/system';

@Module({
  imports: [SystemModule],
  controllers: [HealthController],
  providers: [],
  exports: [],
})
export class ApiModule {}
