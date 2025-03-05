import { Injectable } from '@nestjs/common';
import { SetStatusData } from '@tsailab/core-types';
import { QueryOptionsDto } from '@xtsai/core';
import { BaseRoleModel, CreateRoleModel, SysRoleService } from '@xtsai/system';

@Injectable()
export class RoleManager {
  constructor(private readonly roleService: SysRoleService) {}

  pagelist(dto: QueryOptionsDto) {
    return this.roleService.queryList(dto);
  }

  createNewRole(model: CreateRoleModel) {
    return this.roleService.addRole(model);
  }

  updateSomeRole(some: BaseRoleModel) {
    return this.roleService.updateRole(some);
  }

  setRoleDefault(id: number) {
    return this.roleService.setDefault(id);
  }

  updateRoleStatus(dto: SetStatusData) {
    return this.roleService.setRoleStatus(dto);
  }
}
