import { Provider } from '@nestjs/common';
import {
  // common
  DictService,
  SysRegionService,
  SysRoleService,
  // main
  CustomUserService,
  OrganizationService,
  SysUserService,
  SystemService,
} from './services';

export const sharedServices: Provider[] = [
  // common
  DictService,
  SysRegionService,
  SysRoleService,
  // main
  CustomUserService,
  OrganizationService,
  SysUserService,
  SystemService,
];
