import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryLogParams } from '@xtsai/core';
import { CustomLogService } from '@xtsai/system';
import { xaiAdminRoutes } from 'src/api';

@ApiTags(`${xaiAdminRoutes.Common.desc}: 用户日志`)
@Controller('custom/log')
export class CustomLogController {
  protected logger = new Logger(`xtsai-system:${CustomLogController.name}`);

  constructor(private readonly logService: CustomLogService) {}

  @ApiOperation({ summary: '查询系统日志列表' })
  @Get('list')
  pagelist(@Query() queryDto: QueryLogParams) {
    return this.logService.pageList(queryDto);
  }
}
