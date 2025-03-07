import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CustomLogService,
  CustomUserLogEntity,
  SysAccountLogEntity,
  SysUserLogService,
} from '@xtsai/system';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([SysAccountLogEntity, CustomUserLogEntity]),
  ],
  providers: [SysUserLogService, CustomLogService],
  exports: [SysUserLogService, CustomLogService],
})
export class ShareModule {}
