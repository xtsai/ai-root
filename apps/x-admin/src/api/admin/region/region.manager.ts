import { Injectable } from '@nestjs/common';
import {
  BizException,
  UpdateSortnoModel,
  UpdateStatusModel,
} from '@xtsai/core';
import {
  QuerySubRegionOptionModel,
  RegionModelType,
  SysRegionService,
} from '@xtsai/system';
import { ErrorCodeEnum } from '@xtsai/xai-utils';

@Injectable()
export class RegionManager {
  constructor(private readonly regionService: SysRegionService) {}

  getAllRegionTreeNodes(rootid: number) {
    return this.regionService.loadAllNodes(rootid);
  }

  getRegionTreeNodeAsync(rootid: number) {
    return this.regionService.levelRegionTreeNodes(rootid);
  }

  async getRegionModelDetail(id: number) {
    const model = await this.regionService.getRegionModel(id);
    if (!model)
      throw BizException.createError(
        ErrorCodeEnum.DATA_RECORD_REMOVED,
        `该行政区划不存在,请刷新后再试!`,
      );

    return model;
  }

  async updateSomeRegionModel(some: Partial<RegionModelType>) {
    const { id } = some;
    if (!id || id <= 0)
      throw BizException.createError(
        ErrorCodeEnum.DATA_RECORD_REMOVED,
        `该行政区划ID不存在,请刷新后再试!`,
      );

    return await this.regionService.updateRegionSome(some);
  }

  setSortno(dto: UpdateSortnoModel) {
    return this.regionService.updateSortno(dto);
  }

  setStatus(dto: UpdateStatusModel) {
    return this.regionService.updateStatus(dto);
  }

  querySubRegions(dto: QuerySubRegionOptionModel) {
    return this.regionService.querySubList(dto);
  }
}
