import { Inject, Injectable, Logger } from '@nestjs/common';
import { MQMessageType, RedisMQService } from '@tsailab/ioredis-mq';
import { AuditLogCache } from '@xtsai/core';
import { SysUserLogService } from '@xtsai/system';

@Injectable()
export class SystemLogConsumerService {
  protected logger = new Logger(
    `xtsai-logger:${SystemLogConsumerService.name}`,
  );

  @Inject(SysUserLogService)
  private readonly sysLogService: SysUserLogService;

  constructor(private readonly mq: RedisMQService) {
    this.mq.registHandler('sys-log', this.syslogReceivedHandler.bind(this));
  }

  syslogReceivedHandler(message: MQMessageType, channel: string) {
    this.logger.log(
      `Received [${channel}] message:\n${JSON.stringify(message, null, 2)}`,
    );
    switch (channel) {
      case 'sys-log':
        this.saveSystemLog(message);
        break;
      default:
        break;
    }
  }

  saveSystemLog(message: MQMessageType) {
    try {
      const { payload } = message;
      this.sysLogService.createLogByCache(payload as any as AuditLogCache);
    } catch (ex: any) {
      this.logger.error(
        ex,
        `save system log: ${JSON.stringify(message, null, 2)}`,
      );
    }
  }
}
