import { Injectable } from '@nestjs/common';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechStack } from './entities/tech-stack.entity';

@Injectable()
export class TechStacksService {
  constructor(
    @InjectRepository(TechStack)
    private userRepository: Repository<TechStack>,
  ) {}

  async create(createTechStackDto: CreateTechStackDto) {
    return await this.userRepository.save(createTechStackDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateTechStackDto: UpdateTechStackDto) {
    return `This action updates a #${id} ${updateTechStackDto} techStack`;
  }

  remove(id: number) {
    return `This action removes a #${id} techStack`;
  }
}
