import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { xaiAdminRoutes } from '../../api.module.routes';
import { CustomManager } from './custom.manager';
import { QueryCustomDto } from '../dto';

@ApiTags(`${xaiAdminRoutes.System.desc}: 客户管理`)
@Controller('custom')
export class CustomController {
  constructor(private readonly userManager: CustomManager) {}

  @ApiOperation({
    summary: '查询终端用户列表',
  })
  @Get('list')
  querylist(@Query() queryDto: QueryCustomDto) {
    return this.userManager.querylist(queryDto);
  }
}
