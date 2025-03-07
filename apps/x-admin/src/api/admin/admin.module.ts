import { Module } from '@nestjs/common';
import { DictController } from './dict/dict.controller';
import { RegionController } from './region/region.controller';
import { OrganizationController } from './organization/organization.controller';
import { CustomController } from './custom/custom.controller';
import {
  SuserController,
  NextNoController,
  NextNoManager,
  SysUserManager,
} from './suser';
import { CustomManager } from './custom/custom.manager';
import { DictManager } from './dict/dict.manager';
import { RegionManager } from './region/region.manager';
import { RoleController } from './role/role.controller';
import { MenuController } from './menu/menu.controller';
import { RoleManager } from './role/role.manager';
import { SyslogController } from './audit/syslog.controller';
import { CustomLogController } from './audit/custom-log.controller';

@Module({
  imports: [],

  controllers: [
    DictController,
    RegionController,
    OrganizationController,
    CustomController,
    SuserController,
    NextNoController,
    RoleController,
    MenuController,
    SyslogController,
    CustomLogController,
  ],
  providers: [
    CustomManager,
    NextNoManager,
    SysUserManager,
    DictManager,
    RegionManager,
    RoleManager,
  ],
  exports: [],
})
export class AdminModule {}
