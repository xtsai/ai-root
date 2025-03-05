import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { xaiAdminRoutes } from 'src/api/api.module.routes';
import { DictManager } from './dict.manager';
import {
  QueryOptionsDto,
  UpdateSortnoModel,
  UpdateStatusModel,
} from '@xtsai/core';
import {
  DictItemDefaultActivedModel,
  QueryDictItemModel,
  SysDictBaseModel,
  SysDictItemBaseModel,
  SysDictItemModel,
  SysDictModel,
} from '@xtsai/system';

@ApiTags(`${xaiAdminRoutes.Common.desc}: 客户管理`)
@Controller('dict')
export class DictController {
  constructor(private readonly manager: DictManager) {}

  @ApiOperation({ summary: '获取数据字典列表' })
  @Get('list')
  listDict(@Query() queryDto: QueryOptionsDto) {
    return this.manager.list(queryDto);
  }

  @ApiOperation({ summary: '创建字典' })
  @Post('create')
  @HttpCode(HttpStatus.OK)
  createDictInfo(@Body() dict: SysDictBaseModel) {
    return this.manager.createDict(dict);
  }

  @ApiOperation({ summary: '修改字典' })
  @Post('update')
  @HttpCode(HttpStatus.OK)
  updateDictInfo(@Body() dict: SysDictModel) {
    return this.manager.updateDictSome(dict);
  }

  @ApiOperation({ summary: '获取数据字典列表' })
  @Get('item/list')
  listDictItems(@Query() queryDto: QueryDictItemModel) {
    return this.manager.queryItemList(queryDto);
  }

  @ApiOperation({ summary: '设置字典顺序' })
  @Post('set_sortno')
  @HttpCode(HttpStatus.OK)
  setSortnoById(@Body() dto: UpdateSortnoModel) {
    return this.manager.setDictSortnoById(dto);
  }

  @ApiOperation({ summary: '新建字典项' })
  @Post('item/create')
  @HttpCode(HttpStatus.OK)
  createDictItem(@Body() dto: SysDictItemBaseModel) {
    return this.manager.newDictItem(dto);
  }

  @ApiOperation({ summary: '更新字典项' })
  @Post('item/update_some')
  @HttpCode(HttpStatus.OK)
  updateDictItemSome(@Body() dto: SysDictItemModel) {
    return this.manager.updateDictItemSome(dto);
  }

  @ApiOperation({ summary: '设置字典顺序' })
  @Post('item/set_sortno')
  @HttpCode(HttpStatus.OK)
  setItemSortnoById(@Body() dto: UpdateSortnoModel) {
    return this.manager.updateItemSortnoById(dto);
  }

  @ApiOperation({ summary: '设置设置字典项可用状态' })
  @Post('item/set_status')
  @HttpCode(HttpStatus.OK)
  setDictItemStatus(@Body() dto: UpdateStatusModel) {
    return this.manager.setDictItemStatus(dto);
  }

  @ApiOperation({ summary: '设置设置字典项默认激活状态' })
  @Post('item/set_default_actived')
  @HttpCode(HttpStatus.OK)
  setDictItemActivedStatus(@Body() dto: DictItemDefaultActivedModel) {
    return this.manager.setDictItemActivedStatus(dto);
  }

  @ApiOperation({ summary: '获取Dict select list' })
  @Get('item/get_selections')
  @HttpCode(HttpStatus.OK)
  getDictItemSelections(@Query('code') dictCode: string) {
    return this.manager.dictItemSelections(dictCode);
  }
}
