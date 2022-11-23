import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) 
    private notifications: Repository<Notification>,
    private userService: UsersService
  ) { }

  async create(notification: CreateNotificationDto): Promise<Notification> {
    return await this.notifications.save(this.notifications.create(notification));
  }

  findAll() {
    return this.notifications.find();
  }

  findOne(id: number) {
    return this.notifications.findOne({ where: { id } });
  }

  async update(id: number, notification: UpdateNotificationDto) {
    // const user = await this.userService.findOne({ id: Number(id) })
    // const body = { publisher: user, ...rest }
    return this.notifications.update(id, notification)
  }

  remove(id: number) {
    return this.notifications.delete(id)
  }
}
