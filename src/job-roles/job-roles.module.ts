import { Module } from '@nestjs/common';
import { JobRolesService } from './job-roles.service';
import { JobRolesController } from './job-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobRole } from './entities/job-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobRole])],
  controllers: [JobRolesController],
  providers: [JobRolesService],
})
export class JobRolesModule {}
