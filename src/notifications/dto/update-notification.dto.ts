import { InputType, Field, ResolveField, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { CreateNotificationDto } from './create-notification.dto';

@InputType()
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @ApiProperty()
    @Field()
    id: number;

    @ApiProperty()
    @Field()
    name: string;
}
