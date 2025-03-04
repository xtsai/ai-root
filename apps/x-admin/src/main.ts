import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LotoAppListener } from '@tsailab/core-types';
import { ConfigService } from '@nestjs/config';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import * as chalk from 'chalk';
import {
  defaultDocumentSwapper,
  HttpExceptionFilter,
  SwapperOptionSchema,
} from '@xtsai/core';

import { name, version, author } from '../package.json';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const listeners: Array<LotoAppListener> = [];

  const app = await NestFactory.create(AppModule);

  //允许跨域请求
  app.enableCors();

  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.server.port', 18945);

  const apiPrefix = configService.get<string>('app.prefix', 'v1');
  await app.setGlobalPrefix(apiPrefix, {
    exclude: [
      {
        path: 'health',
        method: RequestMethod.GET,
      },
    ],
  });

  // Validations
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // Filter Exceptions
  app.useGlobalFilters(new HttpExceptionFilter());

  // document
  const appName = configService.get<string>('app.name', name);
  const swapperOptions = configService.get<SwapperOptionSchema>(
    'swagger',
    defaultDocumentSwapper,
  );
  const swapperEnabled = swapperOptions.enabled;

  if (swapperEnabled) {
    const { docDesc, wiki, email } = swapperOptions;

    let contactAuthor = 'xtsai';
    if (typeof author === 'string') {
      contactAuthor = author;
    } else if (typeof author === 'object') {
      contactAuthor =
        (author as unknown as { name: string; email: string }).name ?? '';
    }

    const options = new DocumentBuilder()
      .setTitle(appName)
      .setVersion(version ?? '1.0.0')
      .setDescription(docDesc)
      .setContact(contactAuthor, wiki, email)
      .addTag(`api/${apiPrefix}`)
      .addBearerAuth({
        type: 'apiKey',
        in: 'header',
        name: 'token',
      })
      .build();

    const document = await SwaggerModule.createDocument(app, options);
    await SwaggerModule.setup(`doc-${apiPrefix}`, app, document);
  }

  await app.listen(appPort, '0.0.0.0');

  const serveUrl = await app.getUrl();

  if (swapperEnabled) {
    listeners.push({
      name: `${appName} API`,
      url: `${serveUrl}/doc-${apiPrefix}`,
    });
  }

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
