import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryLogParams } from '@xtsai/core';
import { SysUserLogService } from '@xtsai/system';
import { xaiAdminRoutes } from 'src/api/api.module.routes';

@ApiTags(`${xaiAdminRoutes.Common.desc}: 系统用户日志`)
@Controller('syslog')
export class SyslogController {
  constructor(private readonly syslogService: SysUserLogService) {}

  @ApiOperation({ summary: '查询系统日志列表' })
  @Get('list')
  pagelist(@Query() queryDto: QueryLogParams) {
    return this.syslogService.pageList(queryDto);
  }
}
