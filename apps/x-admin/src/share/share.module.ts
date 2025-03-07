import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IORedisModuleOptions, IORedisMQModule } from '@tsailab/ioredis-mq';
import { NextnoCacheService } from '@xtsai/core';
import { SystemLogProducer } from '.';

@Global()
@Module({
  imports: [
    IORedisMQModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const ioredisOpts = config.get('cache.ioredis');
        if (!ioredisOpts) throw new Error(`Xai configuration not found`);
        return ioredisOpts as unknown as IORedisModuleOptions;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [NextnoCacheService, SystemLogProducer],
  exports: [NextnoCacheService, SystemLogProducer],
})
export class ShareModule {}
