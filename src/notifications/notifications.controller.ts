import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller("notifications")
export class NotificationsController {
  constructor(
    private notificationsService: NotificationsService,
  ) { }

  @Post()
  create(@Body(ValidationPipe) notification: CreateNotificationDto): Promise<Notification> {
    return this.notificationsService.create(notification);
  }

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  // // @Query(() => Notification, { name: 'notification' })
  // @Get('/:id')
  // findOne(@Param('id', { type: () => Int }) id: number) {
  //   return this.notificationsService.findOne(id);
  // }

  // // @Mutation(() => Notification)
  // @Patch('')
  // update(
  //   @Args('id', { type: () => Int }) id: number,
  //   @Args('notification') notification: UpdateNotificationDto
  // ) {
  //   return this.notificationsService.update(id, notification);
  // }

  // // @Mutation(() => Notification, { name: 'deleteNotification' })
  // remove(@Args('id', { type: () => Int }) id: number) {
  //   return this.notificationsService.remove(id);
  // }

}
