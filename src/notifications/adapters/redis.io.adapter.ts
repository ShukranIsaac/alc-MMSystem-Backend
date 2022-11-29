import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import Redis from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  getRedisClient() {
    return new Redis({
      host: 'localhost',
      port: 8080
    })
  }

  async connectToRedis(): Promise<void> {
    const pubClient = this.getRedisClient()
    const subClient = this.getRedisClient().duplicate();

    await Promise.all([pubClient, subClient]);

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);
    return server;
  }
}