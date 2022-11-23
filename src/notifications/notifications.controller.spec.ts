import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsResolver } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsResolver],
      providers: [NotificationsService],
    }).compile();

    controller = module.get<NotificationsResolver>(NotificationsResolver);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
