import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { SystemModule } from '@xtsai/system';
import { AdminModule } from './admin/admin.module';
import { SystemInitializeSevice } from './admin/system.initialize.service';

@Module({
  imports: [SystemModule, AdminModule],
  controllers: [HealthController],
  providers: [SystemInitializeSevice],
  exports: [],
})
export class ApiModule {}
