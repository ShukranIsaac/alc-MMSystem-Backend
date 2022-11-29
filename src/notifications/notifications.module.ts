import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from 'src/users/users.module';
import { EventsGateway } from '../notifications/events/events.gateway';
import { RedisIoAdapter } from './adapters/redis.io.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule],
  controllers: [],
  providers: [EventsGateway,RedisIoAdapter],
  exports: [RedisIoAdapter]
})
export class NotificationsModule { }
