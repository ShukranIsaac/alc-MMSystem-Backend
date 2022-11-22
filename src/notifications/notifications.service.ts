import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private notifications: Repository<Notification>,
  ) { }

  create(notification: CreateNotificationDto) {
    return this.notifications.insert(notification);
  }

  findAll() {
    return this.notifications.find();
  }

  findOne(id: number) {
    return this.notifications.findOne({ where: { id } });
  }

  update(id: number, notification: UpdateNotificationDto) {
    return this.notifications.update(id, { ...notification })
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
