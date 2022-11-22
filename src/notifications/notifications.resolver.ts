import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'graphql-subscriptions';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { ApiTags } from '@nestjs/swagger';

// const pubSub = new PubSub();

@ApiTags('notifications')
@Resolver(() => Notification)
export class NotificationsResolver {
  constructor(
    private notificationsService: NotificationsService,
  ) { }

  @Mutation(returns => Notification)
  create(@Args('notification') notification: CreateNotificationDto) {
    return this.notificationsService.create(notification);
  }

  @Query(returns => [Notification], { name: 'notifications' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Query(() => Notification, { name: 'notification' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.findOne(id);
  }

  @Mutation(() => Notification)
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('notification') notification: UpdateNotificationDto
  ) {
    return this.notificationsService.update(id, notification);
  }

  @Mutation(() => Notification, { name: 'deleteNotification' })
  remove(@Args('id', { type: () => Int }) id: number) {
    return this.notificationsService.remove(id);
  }

  // @Subscription(returns => Notification)
  // newNotification() {
  //   return pubSub.asyncIterator('NEW_NOTIFICATION');
  // }
}
