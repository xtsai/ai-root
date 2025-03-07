import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LotoAppListener } from '@tsailab/core-types';
import { ConfigService } from '@nestjs/config';
import * as chalk from 'chalk';
import { name } from '../package.json';

async function bootstrap() {
  const listeners: Array<LotoAppListener> = [];
  const app = await NestFactory.create(AppModule);

  //允许跨域请求
  app.enableCors();

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.server.port', 3000);
  const appName = configService.get<string>('app.name', name);

  await app.listen(appPort, '0.0.0.0');
  const serveUrl = await app.getUrl();
  listeners.push({
    name: appName,
    url: `${serveUrl}/health`,
  });

  return listeners.reverse();
}

bootstrap()
  .then((listeners) => {
    const logger = console.log;
    logger(chalk.magentaBright('🌸🌸🌸🚀🚀🚀🌸🌸🌸'));
    logger(chalk.magentaBright(`API启动完成...\n`));

    listeners.forEach(({ name, url }) => {
      logger(chalk.cyan(`${name}: `, url));
    });

    logger(chalk.magentaBright('\n🌸🌸🌸🚀🚀🚀🌸🌸🌸'));
  })
  .catch((ex: any) => globalThis.console.error(ex));
