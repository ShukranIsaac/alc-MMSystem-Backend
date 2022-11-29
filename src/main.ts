import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './notifications/adapters/redis.io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MMM  API')
    .setDescription('ALC Mentors Management System API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();

  redisIoAdapter.createIOServer(8080, app.getHttpServer());

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(9000);
  Logger.log(`Server Running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
