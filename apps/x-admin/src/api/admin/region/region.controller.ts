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
import { RegionManager } from './region.manager';
import { QuerySubRegionOptionModel, RegionModelType } from '@xtsai/system';
import { UpdateSortnoModel, UpdateStatusModel } from '@xtsai/core';

@ApiTags(`${xaiAdminRoutes.System.desc}: 行政区划`)
@Controller('region')
export class RegionController {
  constructor(private readonly manager: RegionManager) {}

  @ApiOperation({
    summary: '同步获取地区树',
  })
  @Get('sync_tree/:rootid')
  getAllRegionTreeNodes(@Param('rootid') rootid: number) {
    return this.manager.getAllRegionTreeNodes(rootid);
  }

  @ApiOperation({
    summary: '异步获取地区树节点',
  })
  @Get('async_treenode/:rootid')
  getRegionTreeNodeAsync(@Param('rootid') rootid: number) {
    return this.manager.getRegionTreeNodeAsync(rootid);
  }

  @ApiOperation({
    summary: '查询行政区划详细信息',
  })
  @Get('detail/:id')
  getRegionModelDetail(@Param('id') id: number) {
    return this.manager.getRegionModelDetail(id);
  }

  @ApiOperation({
    summary: '更新行政区划信息',
  })
  @Post('update_region')
  @HttpCode(HttpStatus.OK)
  updateRegionModelSome(@Body() some: Partial<RegionModelType>) {
    return this.manager.updateSomeRegionModel(some);
  }

  @ApiOperation({
    summary: '更新行政区划顺序码',
  })
  @Post('set_sortno')
  @HttpCode(HttpStatus.OK)
  setRegionSortno(@Body() dto: UpdateSortnoModel) {
    return this.manager.setSortno(dto);
  }

  @ApiOperation({
    summary: '设置行政区划顺启用状态',
  })
  @Post('set_status')
  @HttpCode(HttpStatus.OK)
  setRegionStatus(@Body() dto: UpdateStatusModel) {
    return this.manager.setStatus(dto);
  }

  @ApiOperation({
    summary: '查询下级行政区划列表',
  })
  @Get('query_sub_regions')
  querySubListRegions(@Query() queryDto: QuerySubRegionOptionModel) {
    return this.manager.querySubRegions(queryDto);
  }
}
