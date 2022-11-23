import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field, ResolveField, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@InputType()
export class CreateNotificationDto {
    @ApiProperty()
    @Field()
    id: number;

    @ApiProperty()
    @Field()
    name: string;

    @ApiProperty()
    @Field()
    publisher: string;
}
