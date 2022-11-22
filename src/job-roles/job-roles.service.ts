import { Injectable } from '@nestjs/common';
import { CreateJobRoleDto } from './dto/create-job-role.dto';
import { UpdateJobRoleDto } from './dto/update-job-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobRole } from './entities/job-role.entity';

@Injectable()
export class JobRolesService {
  constructor(
    @InjectRepository(JobRole)
    private userRepository: Repository<JobRole>,
  ) {}

  async create(createJobRoleDto: CreateJobRoleDto) {
    return await this.userRepository.save(createJobRoleDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} jobRole`;
  }

  update(id: number, updateJobRoleDto: UpdateJobRoleDto) {
    return `This action updates a #${id}  ${updateJobRoleDto}jobRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobRole`;
  }
}
