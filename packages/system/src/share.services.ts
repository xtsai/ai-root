import { Provider } from '@nestjs/common';
import {
  CustomUserService,
  OrganizationService,
  SysUserService,
  SystemService,
} from './services';

export const sharedServices: Provider[] = [
  CustomUserService,
  OrganizationService,
  SysUserService,
  SystemService,
];
