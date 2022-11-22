import { Injectable } from '@nestjs/common';
import { CreateProgrammeDto } from './dto/create-programme.dto';
import { UpdateProgrammeDto } from './dto/update-programme.dto';

@Injectable()
export class ProgrammesService {
  create(createProgrammeDto: CreateProgrammeDto) {
    return createProgrammeDto;
  }

  findAll() {
    return `This action returns all programmes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programme`;
  }

  update(id: number, updateProgrammeDto: UpdateProgrammeDto) {
    return `This action updates a #${id}  ${updateProgrammeDto}programme`;
  }

  remove(id: number) {
    return `This action removes a #${id} programme`;
  }
}
