import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  IORedisModuleOptions,
  IORedisMQModule,
  yamlConfigLoader,
} from '@tsailab/ioredis-mq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlTypeormOptionFactory } from '@xtsai/core';
import { ShareModule } from './share/share.module';
import { MqModule } from './mq/mq.module';

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
    IORedisMQModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const ioredisOpts = config.get('cache.ioredis');
        if (!ioredisOpts) throw new Error(`Xai configuration not found`);
        return ioredisOpts as unknown as IORedisModuleOptions;
      },
      inject: [ConfigService],
    }),
    ShareModule,
    MqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
