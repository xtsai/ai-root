import { Inject, Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { MysqlOptionsSchema } from '@xtsai/core';

@Injectable()
export class MysqlTypeormOptionFactory implements TypeOrmOptionsFactory {
  private logger = new Logger(`@xtsai-core:${MysqlTypeormOptionFactory.name}`);
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  createTypeOrmOptions(
    _connectionName?: string,
  ): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const opts = this.configService.get('mysql', null);
    if (!opts) {
      throw new Error(`Mysql configuration not found.`);
    }
    const {
      host = '127.0.0.1',
      port = 3306,
      database,
      username,
      password,
      logging = false,
      synchronize = true,
      autoLoadEntities = true,
    } = opts as any as MysqlOptionsSchema;
    if (!database?.length || !username?.length || !password?.length) {
      throw new Error(`Mysql config key database,username or password unset.`);
    }

    this.logger.log(opts);

    const options: TypeOrmModuleOptions = {
      type: 'mysql',
      host,
      port,
      database,
      username,
      password,
      logging,
      synchronize,
      autoLoadEntities,
      entities: [
        process.cwd() + '/**/*.entity.{ts,js}',
        process.cwd() + '/**/*.orm.{ts,js}',
      ],
      timezone: '+08:00', // 东八区
      cache: {
        duration: 60000, // 1分钟的缓存
      },
    };

    return options;
  }
}
