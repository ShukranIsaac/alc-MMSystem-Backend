import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JobRolesService } from './job-roles.service';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Job Roles')
@Controller('job-roles')
export class JobRolesController {
  constructor(private readonly jobRolesService: JobRolesService) {}

  @Post()
  create(@Body() createJobRoleDto: CreateJobRoleDto) {
    return this.jobRolesService.create(createJobRoleDto);
  }

  @Get()
  findAll() {
    return this.jobRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobRoleDto: UpdateJobRoleDto) {
    return this.jobRolesService.update(+id, updateJobRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobRolesService.remove(+id);
  }
}
