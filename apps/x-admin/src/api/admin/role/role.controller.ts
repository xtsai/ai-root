import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { xaiAdminRoutes } from 'src/api';
import { RoleManager } from './role.manager';
import { QueryOptionsDto } from '@xtsai/core';
import { BaseRoleModel, CreateRoleModel } from '@xtsai/system';
import { SetStatusData } from '@tsailab/core-types';

@ApiTags(`${xaiAdminRoutes.System.desc}: 系统角色`)
@Controller('role')
export class RoleController {
  constructor(private readonly manager: RoleManager) {}

  @ApiOperation({ summary: '查询角色列表' })
  @Get('list')
  queryList(@Query() queryParams: QueryOptionsDto) {
    return this.manager.pagelist(queryParams);
  }

  @ApiOperation({ summary: '创建角色' })
  @Post('create')
  createRole(@Body() dto: CreateRoleModel) {
    return this.manager.createNewRole(dto);
  }
  @ApiOperation({ summary: '更新角色' })
  @Post('update')
  updateRole(@Body() dto: BaseRoleModel) {
    return this.manager.updateSomeRole(dto);
  }

  @ApiOperation({ summary: '设为默认' })
  @Post('set_default/:id')
  @HttpCode(HttpStatus.OK)
  setDefault(@Param('id') id: number) {
    return this.manager.setRoleDefault(id);
  }

  @ApiOperation({ summary: '设置状态' })
  @Post('set_status')
  @HttpCode(HttpStatus.OK)
  updateRoleStatus(@Body() data: SetStatusData) {
    return this.manager.updateRoleStatus(data);
  }
}
