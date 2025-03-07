import { Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';
import { SystemModule } from '@xtsai/system';
import { AdminModule } from './admin/admin.module';
import { SystemInitializeSevice } from './admin/system.initialize.service';
import { RouterModule } from '@nestjs/core';
import { xaiAdminRoutes } from './api.module.routes';
import { AibotModule } from './aibot/aibot.module';

@Module({
  imports: [
    RouterModule.register([
      {
        module: AdminModule,
        path: xaiAdminRoutes.System.modulePath,
      },
      {
        module: AibotModule,
        path: xaiAdminRoutes.AIBot.modulePath,
      },
    ]),
    SystemModule,
    AdminModule,
    AibotModule,
  ],
  controllers: [HealthController],
  providers: [SystemInitializeSevice],
  exports: [],
})
export class ApiModule {}
