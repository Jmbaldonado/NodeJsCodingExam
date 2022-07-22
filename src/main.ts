import { APP_PORT } from '@modules/common/environment';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import corsConfig from './config/cors.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(corsConfig);
  await app.listen(APP_PORT, '0.0.0.0').then(async () => {
    Logger.log(
      `✅  Application is running on: ${await app.getUrl()}`,
      'NestJS',
    );
  });
}
bootstrap().catch((e) => {
  Logger.error('❌  Error starting server', e, 'NestJS', false);
  throw e;
});
