import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from 'src/users/users.module';
import { EventsGateway } from '../notifications/events/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Notification]), UsersModule],
  controllers: [],
  providers: [EventsGateway],
  exports: []
})
export class NotificationsModule { }
