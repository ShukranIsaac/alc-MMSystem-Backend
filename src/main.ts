import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import cluster from "cluster";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { Logger, ValidationPipe } from '@nestjs/common';
import { RedisIoAdapter } from './notifications/adapters/redis.io.adapter';
import { SocketIOServer } from './notifications/adapters/socket.io.server';
import { GlobalExceptionFilter } from './utils/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());

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

  app.useWebSocketAdapter(redisIoAdapter);

  const WORKERS_COUNT = 4;

  await app.listen(3000);

  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < WORKERS_COUNT; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
      cluster.fork();
    });

    setupMaster(app.getHttpServer(), {
      loadBalancingMethod: "least-connection", // either "random", "round-robin" or "least-connection"
    });
  } else {
    console.log(`Worker ${process.pid} started`);
    const ioServer = new SocketIOServer()
    setupWorker(ioServer.ioServer(redisIoAdapter.getRedisClient(),
      redisIoAdapter.createIOServer(app.getHttpServer())))
  }
  Logger.log(`Server Running on ${await app.getUrl()}`, 'Bootstrap');
}
bootstrap();
