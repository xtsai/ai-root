import { Controller, Get, Logger } from '@nestjs/common';
import { RedisService } from '@tsailab/ioredis-mq';
import { SystemService } from '@xtsai/system';

@Controller('health')
export class HealthController {
  protected logger = new Logger(HealthController.name);
  constructor(
    private redisService: RedisService,
    private readonly systemService: SystemService,
  ) {}

  @Get()
  async beat() {
    try {
      const data = await this.redisService.getData('xai-test');
      const opts = await this.systemService.getConfigOptions();
      this.logger.warn(data, opts);
      return opts;
    } catch (error) {
      this.logger.error(error);
      return 'no';
    }
  }
}
