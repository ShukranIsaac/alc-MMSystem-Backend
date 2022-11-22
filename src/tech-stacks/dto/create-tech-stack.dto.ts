import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTechStackDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  name: string;
}
