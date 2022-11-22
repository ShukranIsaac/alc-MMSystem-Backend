import { Test, TestingModule } from '@nestjs/testing';
import { JobRolesService } from './job-roles.service';

describe('JobRolesService', () => {
  let service: JobRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JobRolesService],
    }).compile();

    service = module.get<JobRolesService>(JobRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
