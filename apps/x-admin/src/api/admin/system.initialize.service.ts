import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NextNoType } from '@tsailab/core-types';
import { NextnoCacheService } from '@xtsai/core';
import {
  CategoryService,
  OrganizationService,
  SysUserService,
} from '@xtsai/system';

@Injectable()
export class SystemInitializeSevice implements OnModuleInit {
  protected logger = new Logger(`@xtsai-system:${SystemInitializeSevice.name}`);

  constructor(
    private readonly organizationService: OrganizationService,
    private readonly sysUserService: SysUserService,
    private readonly nextnoCacheManager: NextnoCacheService,
    private readonly categoryService: CategoryService,
  ) {}

  onModuleInit() {
    this.logger.warn('initialization system module');
    this.initRootOrganization();
    this.initUserNos();
    this.initSupperAdminUser();
    this.initCategory();
  }

  private async initRootOrganization() {
    try {
      await this.organizationService.initRootNode();
      this.logger.log('Initialize root organization success');
    } catch (e) {
      this.logger.error(e, `Initialize root organization error,${e.message}`);
    }
  }

  private async initUserNos() {
    try {
      const msg = await this.nextnoCacheManager.increaseUnos(NextNoType.USER);
      const nextno = await this.nextnoCacheManager.getHash(NextNoType.USER);
      // await this.nextnoCacheManager.setHash(NextNoType.USER, nextno);
      this.logger.log(`Initialize user no success: ${msg},current:[${nextno}]`);
    } catch (e) {
      this.logger.error(`Initialize user no error,${e.message}`);
    }
  }

  private async initSupperAdminUser() {
    try {
      const result = await this.sysUserService.initSuperUser();
      this.logger.log(result);
    } catch (e) {
      this.logger.error(`Initialize root organization error,${e.message}`);
    }
  }

  private async initCategory() {
    try {
      const result = await this.categoryService.initCategory();
      if (result) {
        this.logger.log(`initialize category ${result}`);
      }
    } catch (e) {
      this.logger.error(`Initialize root category error,${e.message}`);
    }
  }
}
