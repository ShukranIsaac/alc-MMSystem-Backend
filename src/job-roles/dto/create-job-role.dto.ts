import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateJobRoleDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;
}
