import { Test, TestingModule } from '@nestjs/testing';
import { JobRolesController } from './job-roles.controller';
import { JobRolesService } from './job-roles.service';

describe('JobRolesController', () => {
  let controller: JobRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobRolesController],
      providers: [JobRolesService],
    }).compile();

    controller = module.get<JobRolesController>(JobRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
