import { Injectable } from '@nestjs/common';
import {
  QueryOptionsDto,
  UpdateSortnoModel,
  UpdateStatusModel,
} from '@xtsai/core';
import {
  DictItemDefaultActivedModel,
  DictService,
  QueryDictItemModel,
  SysDictBaseModel,
  SysDictItemBaseModel,
  SysDictItemModel,
  SysDictModel,
} from '@xtsai/system';

@Injectable()
export class DictManager {
  constructor(private readonly dictService: DictService) {}

  list(queryDto: QueryOptionsDto) {
    return this.dictService.queryDictList(queryDto);
  }

  createDict(dict: SysDictBaseModel) {
    return this.dictService.createDict(dict);
  }

  updateDictSome(dict: SysDictModel) {
    return this.dictService.updateDictSome(dict);
  }

  queryItemList(queryDto: QueryDictItemModel) {
    return this.dictService.queryDictItems(queryDto);
  }

  setDictSortnoById(dto: UpdateSortnoModel) {
    return this.dictService.updateDictSortno(dto);
  }

  newDictItem(dto: SysDictItemBaseModel) {
    return this.dictService.createDictItem(dto);
  }

  updateDictItemSome(dto: SysDictItemModel) {
    return this.dictService.updateSomeDictItem(dto);
  }

  updateItemSortnoById(dto: UpdateSortnoModel) {
    return this.dictService.updateDictItemSortno(dto);
  }

  setDictItemStatus(dto: UpdateStatusModel) {
    return this.dictService.setDictItemStatus(dto);
  }

  setDictItemActivedStatus(dto: DictItemDefaultActivedModel) {
    return this.dictService.setDictItemDefaultActived(dto);
  }

  dictItemSelections(dictCode: string) {
    return this.dictService.getDictSelectionOptions(dictCode);
  }
}
