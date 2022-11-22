import { InputType, Field } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';

@InputType()
export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
    @Field()
    id: number;

    @Field()
    name: string;

    // @Field()
    // publisher: number;
}
