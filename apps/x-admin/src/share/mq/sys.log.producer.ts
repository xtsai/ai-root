import { Injectable, Logger } from '@nestjs/common';
import { RedisMQService } from '@tsailab/ioredis-mq';
import { AuditLogCache } from '@xtsai/core';
import { RandomUtil } from '@xtsai/xai-utils';

@Injectable()
export class SystemLogProducer {
  protected logger = new Logger(`xtsai-admin:${SystemLogProducer}`);

  constructor(private readonly mq: RedisMQService) {}

  publicSystemLog(logCache: AuditLogCache) {
    this.mq.publishMessage(logCache, 'sys-log');
  }

  newLogCacheId(prefix: string = ''): string {
    const id = RandomUtil.clientUUID();
    return prefix?.length ? `${prefix}_${id}` : id;
  }
}
