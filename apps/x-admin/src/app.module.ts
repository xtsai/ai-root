import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ShareModule } from './share/share.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { yamlConfigLoader } from '@tsailab/ioredis-mq';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlTypeormOptionFactory, XAuthJwtGuard } from '@xtsai/core';
import { SystemModule } from '@xtsai/system';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [yamlConfigLoader],
      validationOptions: {
        allowUnknow: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlTypeormOptionFactory,
      inject: [ConfigService],
    }),
    SystemModule.forRoot(true),
    ShareModule,
    ApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: XAuthJwtGuard,
    },
    AppService,
  ],
})
export class AppModule {}
